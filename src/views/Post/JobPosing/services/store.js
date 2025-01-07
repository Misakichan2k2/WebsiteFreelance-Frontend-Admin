export const UserService = {
  getData() {
    return [
      {
        id: 1000,
        name: "James Butt",
        role: "Customer",
        status: "unverified",
        createdDate: "2015-09-13",
        verified: true,
      },
      {
        id: 1001,
        name: "Josephine Darakjy",
        role: "Customer",
        status: "unverified",
        createdDate: "2019-02-09",
        verified: true,
      },
      {
        id: 1002,
        name: "Art Venere",
        role: "Freelancer",
        status: "verified",
        createdDate: "2017-05-13",
        verified: false,
      },
      {
        id: 1003,
        name: "Lenna Paprocki",
        role: "Freelancer",
        status: "verified",
        createdDate: "2020-09-15",
        verified: false,
      },
      {
        id: 1499,
        name: "Chauncey Motley",
        role: "Customer",
        status: "verified",
        createdDate: "2019-04-23",
        verified: true,
      },
    ];
  },

  getUsersLarge() {
    return Promise.resolve(this.getData());
  },
};
