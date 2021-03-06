import { from } from 'rxjs';
import { keepUnstableUntilFirst } from '@angular/fire';
import { fromDocRef } from '../observable/fromRef';
import { map } from 'rxjs/operators';
import { associateQuery } from '../firestore';
import { AngularFirestoreCollection } from '../collection/collection';
/**
 * AngularFirestoreDocument service
 *
 * This class creates a reference to a Firestore Document. A reference is provided in
 * in the constructor. The class is generic which gives you type safety for data update
 * methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const fakeStock = new AngularFirestoreDocument<Stock>(doc('stocks/FAKE'));
 * await fakeStock.set({ name: 'FAKE', price: 0.01 });
 * fakeStock.valueChanges().map(snap => {
 *   if(snap.exists) return snap.data();
 *   return null;
 * }).subscribe(value => console.log(value));
 * // OR! Transform using Observable.from() and the data is unwrapped for you
 * Observable.from(fakeStock).subscribe(value => console.log(value));
 */
export class AngularFirestoreDocument {
    /**
     * The constructor takes in a DocumentReference to provide wrapper methods
     * for data operations, data streaming, and Symbol.observable.
     */
    constructor(ref, afs) {
        this.ref = ref;
        this.afs = afs;
    }
    /**
     * Create or overwrite a single document.
     */
    set(data, options) {
        return this.ref.set(data, options);
    }
    /**
     * Update some fields of a document without overwriting the entire document.
     */
    update(data) {
        return this.ref.update(data);
    }
    /**
     * Delete a document.
     */
    delete() {
        return this.ref.delete();
    }
    /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     */
    collection(path, queryFn) {
        const collectionRef = this.ref.collection(path);
        const { ref, query } = associateQuery(collectionRef, queryFn);
        return new AngularFirestoreCollection(ref, query, this.afs);
    }
    /**
     * Listen to snapshot updates from the document.
     */
    snapshotChanges() {
        const scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
        return scheduledFromDocRef$.pipe(keepUnstableUntilFirst);
    }
    valueChanges(options = {}) {
        return this.snapshotChanges().pipe(map(({ payload }) => options.idField ? Object.assign(Object.assign({}, payload.data()), { [options.idField]: payload.id }) : payload.data()));
    }
    /**
     * Retrieve the document once.
     */
    get(options) {
        return from(this.ref.get(options)).pipe(keepUnstableUntilFirst);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L2ZpcmVzdG9yZS9kb2N1bWVudC9kb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBb0IsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3RFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLE9BQU8sd0JBQXdCO0lBRW5DOzs7T0FHRztJQUNILFlBQW1CLEdBQXlCLEVBQVUsR0FBcUI7UUFBeEQsUUFBRyxHQUFILEdBQUcsQ0FBc0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFJLENBQUM7SUFFaEY7O09BRUc7SUFDSCxHQUFHLENBQUMsSUFBTyxFQUFFLE9BQW9CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBbUIsSUFBWSxFQUFFLE9BQWlCO1FBQzFELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBOEMsQ0FBQztRQUM3RixNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixNQUFNLG9CQUFvQixHQUFHLFVBQVUsQ0FBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUM5QixzQkFBc0IsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFVRCxZQUFZLENBQW1CLFVBQTJCLEVBQUU7UUFDMUQsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0NBQ2IsT0FBTyxDQUFDLElBQUksRUFBRSxHQUNkLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUNULENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FDL0MsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLE9BQXVDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNyQyxzQkFBc0IsQ0FDdkIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGtlZXBVbnN0YWJsZVVudGlsRmlyc3QgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IEFjdGlvbiwgRG9jdW1lbnREYXRhLCBEb2N1bWVudFJlZmVyZW5jZSwgRG9jdW1lbnRTbmFwc2hvdCwgUXVlcnlGbiwgU2V0T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZnJvbURvY1JlZiB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbVJlZic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlLCBhc3NvY2lhdGVRdWVyeSB9IGZyb20gJy4uL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiB9IGZyb20gJy4uL2NvbGxlY3Rpb24vY29sbGVjdGlvbic7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvY29tcGF0L2FwcCc7XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZURvY3VtZW50IHNlcnZpY2VcbiAqXG4gKiBUaGlzIGNsYXNzIGNyZWF0ZXMgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgRG9jdW1lbnQuIEEgcmVmZXJlbmNlIGlzIHByb3ZpZGVkIGluXG4gKiBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSBjbGFzcyBpcyBnZW5lcmljIHdoaWNoIGdpdmVzIHlvdSB0eXBlIHNhZmV0eSBmb3IgZGF0YSB1cGRhdGVcbiAqIG1ldGhvZHMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyBTeW1ib2wub2JzZXJ2YWJsZSB0byB0cmFuc2Zvcm0gaW50byBPYnNlcnZhYmxlIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcmFyZWx5IHVzZWQgZGlyZWN0bHkgYW5kIHNob3VsZCBiZSBjcmVhdGVkIGZyb20gdGhlIEFuZ3VsYXJGaXJlc3RvcmUgc2VydmljZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IGZha2VTdG9jayA9IG5ldyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8U3RvY2s+KGRvYygnc3RvY2tzL0ZBS0UnKSk7XG4gKiBhd2FpdCBmYWtlU3RvY2suc2V0KHsgbmFtZTogJ0ZBS0UnLCBwcmljZTogMC4wMSB9KTtcbiAqIGZha2VTdG9jay52YWx1ZUNoYW5nZXMoKS5tYXAoc25hcCA9PiB7XG4gKiAgIGlmKHNuYXAuZXhpc3RzKSByZXR1cm4gc25hcC5kYXRhKCk7XG4gKiAgIHJldHVybiBudWxsO1xuICogfSkuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKiAvLyBPUiEgVHJhbnNmb3JtIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpIGFuZCB0aGUgZGF0YSBpcyB1bndyYXBwZWQgZm9yIHlvdVxuICogT2JzZXJ2YWJsZS5mcm9tKGZha2VTdG9jaykuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VCA9IERvY3VtZW50RGF0YT4ge1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgaW4gYSBEb2N1bWVudFJlZmVyZW5jZSB0byBwcm92aWRlIHdyYXBwZXIgbWV0aG9kc1xuICAgKiBmb3IgZGF0YSBvcGVyYXRpb25zLCBkYXRhIHN0cmVhbWluZywgYW5kIFN5bWJvbC5vYnNlcnZhYmxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHJlZjogRG9jdW1lbnRSZWZlcmVuY2U8VD4sIHByaXZhdGUgYWZzOiBBbmd1bGFyRmlyZXN0b3JlKSB7IH1cblxuICAvKipcbiAgICogQ3JlYXRlIG9yIG92ZXJ3cml0ZSBhIHNpbmdsZSBkb2N1bWVudC5cbiAgICovXG4gIHNldChkYXRhOiBULCBvcHRpb25zPzogU2V0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnJlZi5zZXQoZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNvbWUgZmllbGRzIG9mIGEgZG9jdW1lbnQgd2l0aG91dCBvdmVyd3JpdGluZyB0aGUgZW50aXJlIGRvY3VtZW50LlxuICAgKi9cbiAgdXBkYXRlKGRhdGE6IFBhcnRpYWw8VD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYudXBkYXRlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGRvY3VtZW50LlxuICAgKi9cbiAgZGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnJlZi5kZWxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBzdWItY29sbGVjdGlvbiBnaXZlbiBhIHBhdGggYW5kIGFuIG9wdGlvbmFsIHF1ZXJ5XG4gICAqIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29sbGVjdGlvbjxSID0gRG9jdW1lbnREYXRhPihwYXRoOiBzdHJpbmcsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248Uj4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSB0aGlzLnJlZi5jb2xsZWN0aW9uKHBhdGgpIGFzIGZpcmViYXNlLmZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlPFI+O1xuICAgIGNvbnN0IHsgcmVmLCBxdWVyeSB9ID0gYXNzb2NpYXRlUXVlcnkoY29sbGVjdGlvblJlZiwgcXVlcnlGbik7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbihyZWYsIHF1ZXJ5LCB0aGlzLmFmcyk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHNuYXBzaG90IHVwZGF0ZXMgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoKTogT2JzZXJ2YWJsZTxBY3Rpb248RG9jdW1lbnRTbmFwc2hvdDxUPj4+IHtcbiAgICBjb25zdCBzY2hlZHVsZWRGcm9tRG9jUmVmJCA9IGZyb21Eb2NSZWY8VD4odGhpcy5yZWYsIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpO1xuICAgIHJldHVybiBzY2hlZHVsZWRGcm9tRG9jUmVmJC5waXBlKFxuICAgICAga2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHVud3JhcHBlZCBzbmFwc2hvdCB1cGRhdGVzIGZyb20gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBJZiB0aGUgYGlkRmllbGRgIG9wdGlvbiBpcyBwcm92aWRlZCwgZG9jdW1lbnQgSURzIGFyZSBpbmNsdWRlZCBhbmQgbWFwcGVkIHRvIHRoZVxuICAgKiBwcm92aWRlZCBgaWRGaWVsZGAgcHJvcGVydHkgbmFtZS5cbiAgICovXG4gIHZhbHVlQ2hhbmdlcyhvcHRpb25zPzogeyB9KTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPjtcbiAgdmFsdWVDaGFuZ2VzPEsgZXh0ZW5kcyBzdHJpbmc+KG9wdGlvbnM6IHsgaWRGaWVsZDogSyB9KTogT2JzZXJ2YWJsZTwoVCAmIHsgW1QgaW4gS106IHN0cmluZyB9KSB8IHVuZGVmaW5lZD47XG4gIHZhbHVlQ2hhbmdlczxLIGV4dGVuZHMgc3RyaW5nPihvcHRpb25zOiB7IGlkRmllbGQ/OiBLIH0gPSB7fSk6IE9ic2VydmFibGU8VCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnNuYXBzaG90Q2hhbmdlcygpLnBpcGUoXG4gICAgICBtYXAoKHsgcGF5bG9hZCB9KSA9PlxuICAgICAgICBvcHRpb25zLmlkRmllbGQgPyB7XG4gICAgICAgICAgLi4ucGF5bG9hZC5kYXRhKCksXG4gICAgICAgICAgLi4ueyBbb3B0aW9ucy5pZEZpZWxkXTogcGF5bG9hZC5pZCB9XG4gICAgICAgIH0gYXMgVCAmIHsgW1QgaW4gS106IHN0cmluZyB9IDogcGF5bG9hZC5kYXRhKClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBkb2N1bWVudCBvbmNlLlxuICAgKi9cbiAgZ2V0KG9wdGlvbnM/OiBmaXJlYmFzZS5maXJlc3RvcmUuR2V0T3B0aW9ucykge1xuICAgIHJldHVybiBmcm9tKHRoaXMucmVmLmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIGtlZXBVbnN0YWJsZVVudGlsRmlyc3QsXG4gICAgKTtcbiAgfVxufVxuIl19