class OrdersDB {
	constructor() {
		this.NAME_DB = 'dataOrders';
		this.OBJECT_STORE_NAME = 'orders';
	}

	openDB() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.NAME_DB, 1);
			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve('database is open');
			};
			request.onerror = (event) => {
				reject('Error to open database');
			};

			request.onupgradeneeded = (event) => {
				this.db = event.target.result;
				this.createObjectStore();
			};
		});
	}

	createObjectStore() {
		const objectStore=this.db.createObjectStore(this.OBJECT_STORE_NAME, {
			keyPath: 'id',
			autoIncrement: true,
		});

		objectStore.createIndex('idObjectIndex','id_menu',{unique:true})
	}

	addObjectOrder(obj) {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.OBJECT_STORE_NAME],
				'readwrite'
			);
			const objectStore = transaction.objectStore(this.OBJECT_STORE_NAME);

			const addObjectRequest = objectStore.add(obj);

			addObjectRequest.onsuccess = (event) => {

				resolve('Object is added in IndexedDB');
			};

			addObjectRequest.onerror = (event) => {
				reject('Error to add object in IndexedDB');
			};
		});
	}

	getAllObjects() {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(
				[this.OBJECT_STORE_NAME],
				'readonly'
			);
			const objectStore = transaction.objectStore(this.OBJECT_STORE_NAME);

			const getAllRequest = objectStore.getAll();

			getAllRequest.onsuccess = (event) => {
				resolve(event.target.result);
			};

			getAllRequest.onerror = (event) => {
				reject('Error to get All objects from IndexedDB');
			};
		});
	}

	deleteObjectByIdMenu(id_menu){
		return new Promise((resolve,reject)=>{
			const transaction=this.db.transaction([this.OBJECT_STORE_NAME],'readwrite')
			const objectStore= transaction.objectStore(this.OBJECT_STORE_NAME)
			const index=objectStore.index('idObjectIndex');

			const getRequest=index.get(id_menu);

			getRequest.onsuccess=event=>{
				const result=event.target.result;

				if(result){
					const deleteRequest=objectStore.delete(result.id);

					deleteRequest.onsuccess=event=>{
						resolve('Object s deleted from IndexedDB')
					}

					deleteRequest.onerror=event=>{
						reject('Error deleting object from IndexedDB')
					}
				}else{
					reject('Object not found in IndexedDB')
				}
			}

			getRequest.onerror=event=>{
				reject('Error searching for object in IndexedDB')
			}
		})
	}
}

export default OrdersDB;
