/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
declare class Jh {
    convertValue(t: any, e?: string): any;
    convertObject(t: any, e: any): {};
    convertGeoPoint(t: any): Wc;
    convertArray(t: any, e: any): any;
    convertServerTimestamp(t: any, e: any): any;
    convertTimestamp(t: any): at;
    convertDocumentKey(t: any, e: any): xt;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing an array of bytes.
 */ declare class Qc {
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */ static fromBase64String(t: any): Qc;
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */ static fromUint8Array(t: any): Qc;
    /** @hideconstructor */
    constructor(t: any);
    _byteString: any;
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */ toBase64(): any;
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */ toUint8Array(): any;
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */ toString(): string;
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */ isEqual(t: any): any;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** DOMException error code constants. */ declare const Pc: -1;
/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */ declare class gc extends mc {
    _path: any;
    /** The collection's identifier. */ get id(): any;
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */ get path(): any;
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */ get parent(): wc | null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ declare class wc {
    /** @hideconstructor */
    constructor(t: any, e: any, n: any);
    converter: any;
    _key: any;
    /** The type of this Firestore reference. */
    type: string;
    firestore: any;
    get _path(): any;
    /**
     * The document's identifier within its collection.
     */ get id(): any;
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */ get path(): any;
    /**
     * The collection this `DocumentReference` belongs to.
     */ get parent(): gc;
    withConverter(t: any): wc;
}
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ declare class Rh extends Ih {
    /** @hideconstructor protected */
    constructor(t: any, e: any, n: any, s: any, i: any, r: any);
    _firestoreImpl: any;
    metadata: any;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
declare class Kc {
    /**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...t: any[]);
    _internalPath: mt;
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */ isEqual(t: any): boolean;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */ declare class jc {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(t: any);
    _methodName: any;
}
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
declare class Vc extends dc {
    _queue: Ac;
}
/** An error returned by a Firestore operation. */ declare class Q extends a {
    /** @hideconstructor */
    constructor(t: any, e: any);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */ declare class Wc {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(t: any, e: any);
    _lat: any;
    _long: any;
    /**
     * The latitude of this `GeoPoint` instance.
     */ get latitude(): any;
    /**
     * The longitude of this `GeoPoint` instance.
     */ get longitude(): any;
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */ isEqual(t: any): boolean;
    /** Returns a JSON-serializable representation of this GeoPoint. */ toJSON(): {
        latitude: any;
        longitude: any;
    };
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */ _compareTo(t: any): 0 | 1 | -1;
}
declare class bc {
    _progressObserver: {};
    _taskCompletionResolver: j;
    _lastProgress: {
        taskState: string;
        totalBytes: number;
        totalDocuments: number;
        bytesLoaded: number;
        documentsLoaded: number;
    };
    /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */ onProgress(t: any, e: any, n: any): void;
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */ catch(t: any): Promise<any>;
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */ then(t: any, e: any): Promise<any>;
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */ private _completeWith;
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */ private _failWith;
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */ private _updateProgress;
}
/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ declare class mc {
    /** @hideconstructor protected */
    constructor(t: any, e: any, n: any);
    converter: any;
    _query: any;
    /** The type of this Firestore reference. */
    type: string;
    firestore: any;
    withConverter(t: any): mc;
}
/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ declare class Dh {
}
/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */ declare class bh extends Rh {
}
/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */ declare class Ph {
    /** @hideconstructor */
    constructor(t: any, e: any, n: any, s: any);
    _firestore: any;
    _userDataWriter: any;
    _snapshot: any;
    metadata: Ah;
    query: any;
    /** An array of all the documents in the `QuerySnapshot`. */ get docs(): any[];
    /** The number of documents in the `QuerySnapshot`. */ get size(): any;
    /** True if there are no documents in the `QuerySnapshot`. */ get empty(): boolean;
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */ forEach(t: any, e: any): void;
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */ docChanges(t?: {}): any;
    _cachedChanges: any;
    _cachedChangesIncludeMetadataChanges: any;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Metadata about a snapshot, describing the state of the snapshot.
 */ declare class Ah {
    /** @hideconstructor */
    constructor(t: any, e: any);
    hasPendingWrites: any;
    fromCache: any;
    /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */ isEqual(t: any): boolean;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */
declare class at {
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */ static now(): at;
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */ static fromDate(t: any): at;
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */ static fromMillis(t: any): at;
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    constructor(t: any, e: any);
    seconds: any;
    nanoseconds: any;
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */ toDate(): Date;
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */ toMillis(): number;
    _compareTo(t: any): 0 | 1 | -1;
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */ isEqual(t: any): boolean;
    /** Returns a textual representation of this `Timestamp`. */ toString(): string;
    /** Returns a JSON-serializable representation of this `Timestamp`. */ toJSON(): {
        seconds: any;
        nanoseconds: any;
    };
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */ valueOf(): string;
}
declare const ml_base: {
    new (t: any, e: any): {
        _firestore: any;
        _transaction: any;
        _dataReader: Zc;
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */ get(t: any): any;
        set(t: any, e: any, n: any): any;
        update(t: any, e: any, n: any, ...s: any[]): any;
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `Transaction` instance. Used for chaining method calls.
         */ delete(t: any): any;
    };
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ declare class ml extends ml_base {
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */ declare class Zh {
    /** @hideconstructor */
    constructor(t: any, e: any);
    _firestore: any;
    _commitHandler: any;
    _mutations: any[];
    _committed: boolean;
    _dataReader: Zc;
    set(t: any, e: any, n: any): Zh;
    update(t: any, e: any, n: any, ...s: any[]): Zh;
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */ delete(t: any): Zh;
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */ commit(): any;
    _verifyNotCommitted(): void;
}
/** The default database name for a project. */
/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */
declare class vt {
    static empty(): vt;
    constructor(t: any, e: any);
    projectId: any;
    database: any;
    get isDefaultDatabase(): boolean;
    isEqual(t: any): boolean;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */ declare class xt {
    static fromPath(t: any): xt;
    static fromName(t: any): xt;
    static empty(): xt;
    static comparator(t: any, e: any): 0 | 1 | -1;
    static isDocumentKey(t: any): boolean;
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */ static fromSegments(t: any): xt;
    constructor(t: any);
    path: any;
    get collectionGroup(): any;
    /** Returns true if the document is in the specified collectionId. */ hasCollectionId(t: any): boolean;
    /** Returns the collection group (i.e. the name of the parent collection) for this key. */ getCollectionGroup(): any;
    /** Returns the fully qualified path to the parent collection. */ getCollectionPath(): any;
    isEqual(t: any): boolean;
    toString(): any;
}
/**
 * An AppCheck token provider that always yields an empty token.
 * @internal
 */ declare class et {
    getToken(): Promise<Z>;
    invalidateToken(): void;
    start(t: any, e: any): void;
    shutdown(): void;
}
/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */ declare class z {
    getToken(): Promise<null>;
    invalidateToken(): void;
    start(t: any, e: any): void;
    shutdown(): void;
}
/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */ declare class mt extends dt {
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */ static isValidIdentifier(t: any): boolean;
    /**
     * The field designating the key of a document.
     */ static keyField(): mt;
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */ static fromServerFormat(t: any): mt;
    static emptyPath(): mt;
    construct(t: any, e: any, n: any): mt;
    canonicalString(): any;
    toString(): any;
    /**
     * Returns true if this field references the key of a document.
     */ isKeyField(): boolean;
}
declare function hc(t: any, e: any): any;
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * The code of callsites invoking this function are stripped out in production
 * builds. Any side-effects of code within the debugAssert() invocation will not
 * happen in this case.
 *
 * @internal
 */ declare function q(t: any, e: any): void;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Converts a Base64 encoded string to a binary string. */
/** True if and only if the Base64 conversion functions are available. */
declare function yt(): boolean;
/**
 * @internal
 */ declare function $(t: any, ...e: any[]): void;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ declare function Rl(t: any, e: any): Promise<void>;
/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */ declare function oc(t: any, e: any, n: any, s: any): void;
/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ declare function ll(t: any, e: any): Promise<wc>;
/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ declare function Tl(...t: any[]): oh;
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */ declare function Il(...t: any[]): rh;
declare function Mc(t: any): Promise<any>;
declare function yc(t: any, e: any, ...n: any[]): gc;
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */ declare function pc(t: any, e: any): mc;
declare function _c(t: any, e: any, n: any, s?: {}): void;
/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ declare function hl(t: any): Promise<any>;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */ declare function yl(): nh;
/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A `Promise` that is resolved once the network has been disabled.
 */ declare function $c(t: any): any;
declare function Ic(t: any, e: any, ...n: any[]): wc;
/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */ declare function Gc(): Kc;
/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other functions (other than
 * {@link initializeFirestore}, {@link getFirestore} or
 * {@link clearIndexedDbPersistence}.
 *
 * If this fails, `enableIndexedDbPersistence()` will reject the promise it
 * returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A `Promise` that represents successfully enabling persistent storage.
 */ declare function xc(t: any, e: any): any;
/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
 * it returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @returns A `Promise` that represents successfully enabling persistent
 * storage.
 */ declare function Nc(t: any): any;
/**
 * Re-enables use of the network for this {@link Firestore} instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A `Promise` that is resolved once the network has been enabled.
 */ declare function Fc(t: any): any;
declare function Gh(...t: any[]): qh;
declare function Kh(...t: any[]): qh;
/**
 * @internal
 */ declare function Dc(t: any): any;
/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ declare function _l(t: any, e: any): Promise<any>;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */
declare function el(t: any): Promise<Rh>;
/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ declare function sl(t: any): Promise<Rh>;
/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ declare function il(t: any): Promise<Rh>;
/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ declare function rl(t: any): Promise<Ph>;
/**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ declare function ol(t: any): Promise<Ph>;
/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ declare function ul(t: any): Promise<Ph>;
/**
 * Returns the existing {@link Firestore} instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned {@link Firestore}
 * instance is associated with.
 * @returns The {@link Firestore} instance of the provided app.
 */ declare function Sc(e?: import("@firebase/app").FirebaseApp): import("../src").Firestore;
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ declare function El(t: any): uh;
/**
 * Initializes a new instance of {@link Firestore} with the provided settings.
 * Can only be called before any other function, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the {@link Firestore} instance will
 * be associated.
 * @param settings - A settings object to configure the {@link Firestore} instance.
 * @returns A newly initialized {@link Firestore} instance.
 */ declare function vc(t: any, e: any): import("../src").Firestore;
/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ declare function Fh(t: any): Oh;
/**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ declare function $h(t: any): Oh;
/**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The {@link Firestore} instance to load bundles for.
 * @param bundleData - An object representing the bundle to be loaded. Valid
 * objects are `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns A `LoadBundleTask` object, which notifies callers with progress
 * updates, and completion or error events. It can be used as a
 * `Promise<LoadBundleTaskProgress>`.
 */ declare function Lc(t: any, e: any): bc;
/**
 * Reads a Firestore {@link Query} from local cache, identified by the given
 * name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once
 * in local cache, use this method to extract a {@link Query} by name.
 *
 * @param firestore - The {@link Firestore} instance to read the query from.
 * @param name - The name of the query.
 * @returns A `Promise` that is resolved with the Query or `null`.
 */ declare function Uc(t: any, e: any): any;
declare function fl(t: any, ...e: any[]): () => void;
declare function dl(t: any, e: any): () => void;
/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */ declare function Mh(t: any, e?: string): kh;
/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ declare function Ch(t: any, ...e: any[]): any;
/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ declare function Ec(t: any, e: any): boolean;
/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ declare function Tc(t: any, e: any): boolean;
/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ declare function gl(t: any, e: any, n: any): Promise<any>;
/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ declare function pl(): ih;
declare function al(t: any, e: any, n: any): Promise<any>;
/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */ declare function M(t: any): void;
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ declare function vh(t: any, e: any): any;
declare function Uh(...t: any[]): Bh;
declare function Lh(...t: any[]): Bh;
/**
 * Terminates the provided {@link Firestore} instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */ declare function Bc(t: any): any;
declare function cl(t: any, e: any, n: any, ...s: any[]): Promise<any>;
/**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned promise resolves immediately if there are no outstanding writes.
 * Otherwise, the promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` promises are rejected during user
 * changes.
 *
 * @returns A `Promise` which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */ declare function Oc(t: any): Promise<any>;
/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */ declare function Nh(t: any, e: any, n: any): xh;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ declare function Al(t: any): Zh;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ declare class Ih {
    /** @hideconstructor protected */
    constructor(t: any, e: any, n: any, s: any, i: any);
    _firestore: any;
    _userDataWriter: any;
    _key: any;
    _document: any;
    _converter: any;
    /** Property of the `DocumentSnapshot` that provides the document's ID. */ get id(): any;
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */ get ref(): wc;
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */ exists(): boolean;
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */ data(): any;
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    get(t: any): any;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */ declare class dc {
    /** @hideconstructor */
    constructor(t: any, e: any, n: any);
    _authCredentials: any;
    _appCheckCredentials: any;
    /**
     * Whether it's a Firestore or Firestore Lite instance.
     */
    type: string;
    _persistenceKey: string;
    _settings: fc;
    _settingsFrozen: boolean;
    _databaseId: vt;
    _app: any;
    /**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */ get app(): any;
    get _initialized(): boolean;
    get _terminated(): boolean;
    _setSettings(t: any): void;
    _getSettings(): fc;
    _freezeSettings(): fc;
    _delete(): Promise<void>;
    _terminateTask: Promise<void> | undefined;
    /** Returns a JSON-serializable representation of this `Firestore` instance. */ toJSON(): {
        app: any;
        databaseId: vt;
        settings: fc;
    };
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */ _terminate(): Promise<void>;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ declare class Ac {
    Fa: Promise<void>;
    $a: any[];
    Ba: boolean;
    La: any[];
    Ua: any;
    qa: boolean;
    Ka: boolean;
    Ga: any[];
    No: Wo;
    Qa: () => void;
    get isShuttingDown(): boolean;
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */ enqueueAndForget(t: any): void;
    enqueueAndForgetEvenWhileRestricted(t: any): void;
    enterRestrictedMode(t: any): void;
    enqueue(t: any): Promise<any>;
    enqueueRetryable(t: any): void;
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */ za(): Promise<void>;
    Wa(t: any): Promise<any>;
    enqueueAfterDelay(t: any, e: any, n: any): vu;
    ja(): void;
    verifyOperationInProgress(): void;
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */ Ja(): Promise<void>;
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */ Ya(t: any): boolean;
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */ Xa(t: any): Promise<void>;
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */ Za(t: any): void;
    /** Called once a DelayedOperation is run or canceled. */ Ha(t: any): void;
}
import { FirebaseError as a } from "@firebase/util/dist/src/errors";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ declare class j {
    promise: Promise<any>;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
}
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ declare class Zc {
    constructor(t: any, e: any, n: any);
    databaseId: any;
    ignoreUndefinedProperties: any;
    M: any;
    /** Creates a new top-level parse context. */ lc(t: any, e: any, n: any, s?: boolean): Xc;
}
declare class Z {
    constructor(t: any);
    value: any;
    type: string;
    headers: Map<any, any>;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Path represents an ordered sequence of string segments.
 */
declare class dt {
    static comparator(t: any, e: any): 0 | 1 | -1;
    constructor(t: any, e: any, n: any);
    segments: any;
    offset: any;
    len: any;
    get length(): any;
    isEqual(t: any): boolean;
    child(t: any): any;
    /** The index of one past the last segment of the path. */ limit(): any;
    popFirst(t: any): any;
    popLast(): any;
    firstSegment(): any;
    lastSegment(): any;
    get(t: any): any;
    isEmpty(): boolean;
    isPrefixOf(t: any): boolean;
    isImmediateParentOf(t: any): boolean;
    forEach(t: any): void;
    toArray(): any;
}
declare class oh extends jc {
    constructor(t: any, e: any);
    fc: any;
    _toFieldTransform(t: any): In;
    isEqual(t: any): boolean;
}
declare class rh extends jc {
    constructor(t: any, e: any);
    fc: any;
    _toFieldTransform(t: any): In;
    isEqual(t: any): boolean;
}
declare class nh extends jc {
    _toFieldTransform(t: any): null;
    isEqual(t: any): boolean;
}
declare class qh extends Dh {
    constructor(t: any, e: any, n: any);
    type: any;
    Tc: any;
    Ec: any;
    _apply(t: any): mc;
}
declare class uh extends jc {
    constructor(t: any, e: any);
    dc: any;
    _toFieldTransform(t: any): In;
    isEqual(t: any): boolean;
}
declare class Oh extends Dh {
    constructor(t: any, e: any, n: any);
    type: any;
    yc: any;
    Ic: any;
    _apply(t: any): mc;
}
declare class kh extends Dh {
    constructor(t: any, e: any);
    _c: any;
    gc: any;
    type: string;
    _apply(t: any): mc;
}
declare class ih extends jc {
    _toFieldTransform(t: any): In;
    isEqual(t: any): boolean;
}
declare class Bh extends Dh {
    constructor(t: any, e: any, n: any);
    type: any;
    Tc: any;
    Ec: any;
    _apply(t: any): mc;
}
declare class xh extends Dh {
    constructor(t: any, e: any, n: any);
    _c: any;
    wc: any;
    mc: any;
    type: string;
    _apply(t: any): mc;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
declare class fc {
    constructor(t: any);
    host: any;
    ssl: any;
    credentials: any;
    ignoreUndefinedProperties: boolean;
    cacheSizeBytes: any;
    experimentalForceLongPolling: boolean;
    experimentalAutoDetectLongPolling: boolean;
    useFetchStreams: boolean;
    isEqual(t: any): boolean;
}
/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
declare class Wo {
    constructor(t: any, e: any, n?: number, s?: number, i?: number);
    Yn: any;
    timerId: any;
    mo: number;
    yo: number;
    po: number;
    Io: number;
    To: any;
    /** The last backoff attempt, as epoch milliseconds. */
    Eo: number;
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */ reset(): void;
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */ Ao(): void;
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */ Ro(t: any): void;
    Po(): void;
    cancel(): void;
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ bo(): number;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */
declare class vu {
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */ static createAndSchedule(t: any, e: any, n: any, s: any, i: any): vu;
    constructor(t: any, e: any, n: any, s: any, i: any);
    asyncQueue: any;
    timerId: any;
    targetTimeMs: any;
    op: any;
    removalCallback: any;
    deferred: j;
    then: <TResult1 = any, TResult2 = never>(onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */ start(t: any): void;
    timerHandle: NodeJS.Timeout | null | undefined;
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */ skipDelay(): void;
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */ cancel(t: any): void;
    handleDelayElapsed(): void;
    clearTimeout(): void;
}
/** A "context" object passed around while parsing user data. */ declare class Xc {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    constructor(t: any, e: any, n: any, s: any, i: any, r: any);
    settings: any;
    databaseId: any;
    M: any;
    ignoreUndefinedProperties: any;
    fieldTransforms: any;
    fieldMask: any;
    get path(): any;
    get ec(): any;
    /** Returns a new context with the specified settings overwritten. */ nc(t: any): Xc;
    sc(t: any): Xc;
    oc(t: any): Xc;
    uc(t: any): Xc;
    ac(t: any): Q;
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ contains(t: any): boolean;
    tc(): void;
    rc(t: any): void;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A field path and the TransformOperation to perform upon it. */ declare class In {
    constructor(t: any, e: any);
    field: any;
    transform: any;
}
export { Jh as AbstractUserDataWriter, Qc as Bytes, Pc as CACHE_SIZE_UNLIMITED, gc as CollectionReference, wc as DocumentReference, Rh as DocumentSnapshot, Kc as FieldPath, jc as FieldValue, Vc as Firestore, Q as FirestoreError, Wc as GeoPoint, bc as LoadBundleTask, mc as Query, Dh as QueryConstraint, bh as QueryDocumentSnapshot, Ph as QuerySnapshot, Ah as SnapshotMetadata, at as Timestamp, ml as Transaction, Zh as WriteBatch, vt as _DatabaseId, xt as _DocumentKey, et as _EmptyAppCheckTokenProvider, z as _EmptyAuthCredentialsProvider, mt as _FieldPath, hc as _cast, q as _debugAssert, yt as _isBase64Available, $ as _logWarn, Rl as _setIndexConfiguration, oc as _validateIsNotUsedTogether, ll as addDoc, Tl as arrayRemove, Il as arrayUnion, Mc as clearIndexedDbPersistence, yc as collection, pc as collectionGroup, _c as connectFirestoreEmulator, hl as deleteDoc, yl as deleteField, $c as disableNetwork, Ic as doc, Gc as documentId, xc as enableIndexedDbPersistence, Nc as enableMultiTabIndexedDbPersistence, Fc as enableNetwork, Gh as endAt, Kh as endBefore, Dc as ensureFirestoreConfigured, _l as executeWrite, el as getDoc, sl as getDocFromCache, il as getDocFromServer, rl as getDocs, ol as getDocsFromCache, ul as getDocsFromServer, Sc as getFirestore, El as increment, vc as initializeFirestore, Fh as limit, $h as limitToLast, Lc as loadBundle, Uc as namedQuery, fl as onSnapshot, dl as onSnapshotsInSync, Mh as orderBy, Ch as query, Ec as queryEqual, Tc as refEqual, gl as runTransaction, pl as serverTimestamp, al as setDoc, M as setLogLevel, vh as snapshotEqual, Uh as startAfter, Lh as startAt, Bc as terminate, cl as updateDoc, Oc as waitForPendingWrites, Nh as where, Al as writeBatch };
