const columns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "API TYPE", uid: "apiType", sortable: true},
  {name: "API KEY", uid: "apiKey", sortable: true},
  {name: "API NAME", uid: "apiName", sortable: true},
  {name: "API PURPOSE", uid: "apiPurpose", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];


export {columns,  statusOptions};
