import { from } from 'rxjs';
import { filter, map, pairwise, scan, startWith } from 'rxjs/operators';
import { keepUnstableUntilFirst } from '@angular/fire';
import { docChanges, sortedChanges } from './changes';
import { AngularFirestoreDocument } from '../document/document';
import { fromCollectionRef } from '../observable/fromRef';
export function validateEventsArray(events) {
    if (!events || events.length === 0) {
        events = ['added', 'removed', 'modified'];
    }
    return events;
}
/**
 * AngularFirestoreCollection service
 *
 * This class creates a reference to a Firestore Collection. A reference and a query are provided in
 * in the constructor. The query can be the unqueried reference if no query is desired.The class
 * is generic which gives you type safety for data update methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionRef = firebase.firestore.collection('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollection<Stock>(collectionRef, query);
 *
 * // NOTE!: the updates are performed on the reference not the query
 * await fakeStock.add({ name: 'FAKE', price: 0.01 });
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 */
export class AngularFirestoreCollection {
    /**
     * The constructor takes in a CollectionReference and Query to provide wrapper methods
     * for data operations and data streaming.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query. See the AssociatedRefence type for details
     * on this implication.
     */
    constructor(ref, query, afs) {
        this.ref = ref;
        this.query = query;
        this.afs = afs;
    }
    /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     */
    stateChanges(events) {
        let source = docChanges(this.query, this.afs.schedulers.outsideAngular);
        if (events && events.length > 0) {
            source = source.pipe(map(actions => actions.filter(change => events.indexOf(change.type) > -1)));
        }
        return source.pipe(
        // We want to filter out empty arrays, but always emit at first, so the developer knows
        // that the collection has been resolve; even if it's empty
        startWith(undefined), pairwise(), filter(([prior, current]) => current.length > 0 || !prior), map(([prior, current]) => current), keepUnstableUntilFirst);
    }
    /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     */
    auditTrail(events) {
        return this.stateChanges(events).pipe(scan((current, action) => [...current, ...action], []));
    }
    /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     */
    snapshotChanges(events) {
        const validatedEvents = validateEventsArray(events);
        const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
        return scheduledSortedChanges$.pipe(keepUnstableUntilFirst);
    }
    valueChanges(options = {}) {
        return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map(actions => actions.payload.docs.map(a => {
            if (options.idField) {
                return Object.assign(Object.assign({}, a.data()), { [options.idField]: a.id });
            }
            else {
                return a.data();
            }
        })), keepUnstableUntilFirst);
    }
    /**
     * Retrieve the results of the query once.
     */
    get(options) {
        return from(this.query.get(options)).pipe(keepUnstableUntilFirst);
    }
    /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     */
    add(data) {
        return this.ref.add(data);
    }
    /**
     * Create a reference to a single document in a collection.
     */
    doc(path) {
        // TODO is there a better way to solve this type issue
        return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvZmlyZXN0b3JlL2NvbGxlY3Rpb24vY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRzFELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUE2QjtJQUMvRCxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDa0IsR0FBMkIsRUFDMUIsS0FBZSxFQUNmLEdBQXFCO1FBRnRCLFFBQUcsR0FBSCxHQUFHLENBQXdCO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFJLENBQUM7SUFFN0M7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxNQUE2QjtRQUN4QyxJQUFJLE1BQU0sR0FBRyxV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QUFhO1FBQ3ZCLHNEQUFzRDtRQUN0RCxPQUFPLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBwYWlyd2lzZSwgc2Nhbiwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsga2VlcFVuc3RhYmxlVW50aWxGaXJzdCB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uUmVmZXJlbmNlLCBEb2N1bWVudENoYW5nZUFjdGlvbiwgRG9jdW1lbnRDaGFuZ2VUeXBlLCBEb2N1bWVudERhdGEsIERvY3VtZW50UmVmZXJlbmNlLCBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZG9jQ2hhbmdlcywgc29ydGVkQ2hhbmdlcyB9IGZyb20gJy4vY2hhbmdlcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgfSBmcm9tICcuLi9kb2N1bWVudC9kb2N1bWVudCc7XG5pbXBvcnQgeyBmcm9tQ29sbGVjdGlvblJlZiB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbVJlZic7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnLi4vZmlyZXN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pIHtcbiAgaWYgKCFldmVudHMgfHwgZXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2ZW50cyA9IFsnYWRkZWQnLCAncmVtb3ZlZCcsICdtb2RpZmllZCddO1xuICB9XG4gIHJldHVybiBldmVudHM7XG59XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb24gc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBDb2xsZWN0aW9uLiBBIHJlZmVyZW5jZSBhbmQgYSBxdWVyeSBhcmUgcHJvdmlkZWQgaW5cbiAqIGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhlIHF1ZXJ5IGNhbiBiZSB0aGUgdW5xdWVyaWVkIHJlZmVyZW5jZSBpZiBubyBxdWVyeSBpcyBkZXNpcmVkLlRoZSBjbGFzc1xuICogaXMgZ2VuZXJpYyB3aGljaCBnaXZlcyB5b3UgdHlwZSBzYWZldHkgZm9yIGRhdGEgdXBkYXRlIG1ldGhvZHMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyBTeW1ib2wub2JzZXJ2YWJsZSB0byB0cmFuc2Zvcm0gaW50byBPYnNlcnZhYmxlIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcmFyZWx5IHVzZWQgZGlyZWN0bHkgYW5kIHNob3VsZCBiZSBjcmVhdGVkIGZyb20gdGhlIEFuZ3VsYXJGaXJlc3RvcmUgc2VydmljZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSBmaXJlYmFzZS5maXJlc3RvcmUuY29sbGVjdGlvbignc3RvY2tzJyk7XG4gKiBjb25zdCBxdWVyeSA9IGNvbGxlY3Rpb25SZWYud2hlcmUoJ3ByaWNlJywgJz4nLCAnMC4wMScpO1xuICogY29uc3QgZmFrZVN0b2NrID0gbmV3IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFN0b2NrPihjb2xsZWN0aW9uUmVmLCBxdWVyeSk7XG4gKlxuICogLy8gTk9URSE6IHRoZSB1cGRhdGVzIGFyZSBwZXJmb3JtZWQgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5XG4gKiBhd2FpdCBmYWtlU3RvY2suYWRkKHsgbmFtZTogJ0ZBS0UnLCBwcmljZTogMC4wMSB9KTtcbiAqXG4gKiAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBhcyBzbmFwc2hvdHMuIFRoaXMgcHJvdmlkZXMgeW91IGRhdGEgdXBkYXRlcyBhcyB3ZWxsIGFzIGRlbHRhIHVwZGF0ZXMuXG4gKiBmYWtlU3RvY2sudmFsdWVDaGFuZ2VzKCkuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUID0gRG9jdW1lbnREYXRhPiB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgaW4gYSBDb2xsZWN0aW9uUmVmZXJlbmNlIGFuZCBRdWVyeSB0byBwcm92aWRlIHdyYXBwZXIgbWV0aG9kc1xuICAgKiBmb3IgZGF0YSBvcGVyYXRpb25zIGFuZCBkYXRhIHN0cmVhbWluZy5cbiAgICpcbiAgICogTm90ZTogRGF0YSBvcGVyYXRpb24gbWV0aG9kcyBhcmUgZG9uZSBvbiB0aGUgcmVmZXJlbmNlIG5vdCB0aGUgcXVlcnkuIFRoaXMgbWVhbnNcbiAgICogd2hlbiB5b3UgdXBkYXRlIGRhdGEgaXQgaXMgbm90IHVwZGF0aW5nIGRhdGEgdG8gdGhlIHdpbmRvdyBvZiB5b3VyIHF1ZXJ5IHVubGVzc1xuICAgKiB0aGUgZGF0YSBmaXRzIHRoZSBjcml0ZXJpYSBvZiB0aGUgcXVlcnkuIFNlZSB0aGUgQXNzb2NpYXRlZFJlZmVuY2UgdHlwZSBmb3IgZGV0YWlsc1xuICAgKiBvbiB0aGlzIGltcGxpY2F0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IHJlZjogQ29sbGVjdGlvblJlZmVyZW5jZTxUPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHF1ZXJ5OiBRdWVyeTxUPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFmczogQW5ndWxhckZpcmVzdG9yZSkgeyB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgbGF0ZXN0IGNoYW5nZSBpbiB0aGUgc3RyZWFtLiBUaGlzIG1ldGhvZCByZXR1cm5zIGNoYW5nZXNcbiAgICogYXMgdGhleSBvY2N1ciBhbmQgdGhleSBhcmUgbm90IHNvcnRlZCBieSBxdWVyeSBvcmRlci4gVGhpcyBhbGxvd3MgeW91IHRvIGNvbnN0cnVjdFxuICAgKiB5b3VyIG93biBkYXRhIHN0cnVjdHVyZS5cbiAgICovXG4gIHN0YXRlQ2hhbmdlcyhldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIGxldCBzb3VyY2UgPSBkb2NDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpO1xuICAgIGlmIChldmVudHMgJiYgZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5waXBlKFxuICAgICAgICBtYXAoYWN0aW9ucyA9PiBhY3Rpb25zLmZpbHRlcihjaGFuZ2UgPT4gZXZlbnRzLmluZGV4T2YoY2hhbmdlLnR5cGUpID4gLTEpKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZS5waXBlKFxuICAgICAgLy8gV2Ugd2FudCB0byBmaWx0ZXIgb3V0IGVtcHR5IGFycmF5cywgYnV0IGFsd2F5cyBlbWl0IGF0IGZpcnN0LCBzbyB0aGUgZGV2ZWxvcGVyIGtub3dzXG4gICAgICAvLyB0aGF0IHRoZSBjb2xsZWN0aW9uIGhhcyBiZWVuIHJlc29sdmU7IGV2ZW4gaWYgaXQncyBlbXB0eVxuICAgICAgc3RhcnRXaXRoPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10sIHVuZGVmaW5lZD4odW5kZWZpbmVkKSxcbiAgICAgIHBhaXJ3aXNlKCksXG4gICAgICBmaWx0ZXIoKFtwcmlvciwgY3VycmVudF0pID0+IGN1cnJlbnQubGVuZ3RoID4gMCB8fCAhcHJpb3IpLFxuICAgICAgbWFwKChbcHJpb3IsIGN1cnJlbnRdKSA9PiBjdXJyZW50KSxcbiAgICAgIGtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHN0cmVhbSBvZiBjaGFuZ2VzIGFzIHRoZXkgb2NjdXIgaXQgdGltZS4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byBzdGF0ZUNoYW5nZXMoKVxuICAgKiBidXQgaXQgY29sbGVjdHMgZWFjaCBldmVudCBpbiBhbiBhcnJheSBvdmVyIHRpbWUuXG4gICAqL1xuICBhdWRpdFRyYWlsKGV2ZW50cz86IERvY3VtZW50Q2hhbmdlVHlwZVtdKTogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxUPltdPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVDaGFuZ2VzKGV2ZW50cykucGlwZShzY2FuKChjdXJyZW50LCBhY3Rpb24pID0+IFsuLi5jdXJyZW50LCAuLi5hY3Rpb25dLCBbXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHN0cmVhbSBvZiBzeW5jaHJvbml6ZWQgY2hhbmdlcy4gVGhpcyBtZXRob2Qga2VlcHMgdGhlIGxvY2FsIGFycmF5IGluIHNvcnRlZFxuICAgKiBxdWVyeSBvcmRlci5cbiAgICovXG4gIHNuYXBzaG90Q2hhbmdlcyhldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIGNvbnN0IHZhbGlkYXRlZEV2ZW50cyA9IHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzKTtcbiAgICBjb25zdCBzY2hlZHVsZWRTb3J0ZWRDaGFuZ2VzJCA9IHNvcnRlZENoYW5nZXM8VD4odGhpcy5xdWVyeSwgdmFsaWRhdGVkRXZlbnRzLCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKTtcbiAgICByZXR1cm4gc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQucGlwZShcbiAgICAgIGtlZXBVbnN0YWJsZVVudGlsRmlyc3RcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBhbGwgZG9jdW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uIGFuZCBpdHMgcG9zc2libGUgcXVlcnkgYXMgYW4gT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogSWYgdGhlIGBpZEZpZWxkYCBvcHRpb24gaXMgcHJvdmlkZWQsIGRvY3VtZW50IElEcyBhcmUgaW5jbHVkZWQgYW5kIG1hcHBlZCB0byB0aGVcbiAgICogcHJvdmlkZWQgYGlkRmllbGRgIHByb3BlcnR5IG5hbWUuXG4gICAqL1xuICB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxUW10+O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIHZhbHVlQ2hhbmdlcyh7fSk6IE9ic2VydmFibGU8VFtdPjtcbiAgdmFsdWVDaGFuZ2VzPEsgZXh0ZW5kcyBzdHJpbmc+KG9wdGlvbnM6IHtpZEZpZWxkOiBLfSk6IE9ic2VydmFibGU8KFQgJiB7IFtUIGluIEtdOiBzdHJpbmcgfSlbXT47XG4gIHZhbHVlQ2hhbmdlczxLIGV4dGVuZHMgc3RyaW5nPihvcHRpb25zOiB7aWRGaWVsZD86IEt9ID0ge30pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiBmcm9tQ29sbGVjdGlvblJlZjxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChhY3Rpb25zID0+IGFjdGlvbnMucGF5bG9hZC5kb2NzLm1hcChhID0+IHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5pZEZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5hLmRhdGEoKSBhcyB7fSxcbiAgICAgICAgICAgICAgLi4ueyBbb3B0aW9ucy5pZEZpZWxkXTogYS5pZCB9XG4gICAgICAgICAgICB9IGFzIFQgJiB7IFtUIGluIEtdOiBzdHJpbmcgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGEuZGF0YSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpLFxuICAgICAgICBrZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSByZXN1bHRzIG9mIHRoZSBxdWVyeSBvbmNlLlxuICAgKi9cbiAgZ2V0KG9wdGlvbnM/OiBmaXJlYmFzZS5maXJlc3RvcmUuR2V0T3B0aW9ucykge1xuICAgIHJldHVybiBmcm9tKHRoaXMucXVlcnkuZ2V0KG9wdGlvbnMpKS5waXBlKFxuICAgICAga2VlcFVuc3RhYmxlVW50aWxGaXJzdCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBkYXRhIHRvIGEgY29sbGVjdGlvbiByZWZlcmVuY2UuXG4gICAqXG4gICAqIE5vdGU6IERhdGEgb3BlcmF0aW9uIG1ldGhvZHMgYXJlIGRvbmUgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5LiBUaGlzIG1lYW5zXG4gICAqIHdoZW4geW91IHVwZGF0ZSBkYXRhIGl0IGlzIG5vdCB1cGRhdGluZyBkYXRhIHRvIHRoZSB3aW5kb3cgb2YgeW91ciBxdWVyeSB1bmxlc3NcbiAgICogdGhlIGRhdGEgZml0cyB0aGUgY3JpdGVyaWEgb2YgdGhlIHF1ZXJ5LlxuICAgKi9cbiAgYWRkKGRhdGE6IFQpOiBQcm9taXNlPERvY3VtZW50UmVmZXJlbmNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLmFkZChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBzaW5nbGUgZG9jdW1lbnQgaW4gYSBjb2xsZWN0aW9uLlxuICAgKi9cbiAgZG9jPFQyID0gVD4ocGF0aD86IHN0cmluZyk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUMj4ge1xuICAgIC8vIFRPRE8gaXMgdGhlcmUgYSBiZXR0ZXIgd2F5IHRvIHNvbHZlIHRoaXMgdHlwZSBpc3N1ZVxuICAgIHJldHVybiBuZXcgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50KHRoaXMucmVmLmRvYyhwYXRoKSBhcyBhbnksIHRoaXMuYWZzKTtcbiAgfVxufVxuIl19