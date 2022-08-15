'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      'Readers',
      [
        {
          _id: 'aaaab----baohohd',
          ownername: 'abdallah',
          age: 22,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          email: 'abdallah@gamil.com',
          location: 'Amman, Tabrbour',
          phoneNumber: '0788860004',
        },
        {
          _id: 'fm900930--kfm0293',
          ownername: 'mohammad',
          age: 20,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          email: 'mohammad@gamil.com',
          location: 'Amman, Tabrbour',
          phoneNumber: '0788415675',
        },
        {
          _id: 'njlnwolwn--hnoiunf-02nbi',
          ownername: 'samer',
          age: 23,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          email: 'samer@gamil.com',
          location: 'Zrqa, new-zarqa',
          phoneNumber: '0793214565',
        },
        {
          _id: 'gfebndfajsbdin----fndasjondf',
          ownername: 'raad',
          age: 12,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          email: 'raad@gamil.com',
          location: 'Amman, 7th,circle',
          phoneNumber: '0775456468',
        },
        {
          _id: 'momfnw--903njofn-2n3',
          ownername: 'shaher',
          age: 43,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',

          email: 'saher@gamil.com',
          location: 'Amman, Tabrbour',
          phoneNumber: '0784564211',
        },
        {
          _id: 'mwefpimow-=ij2j30j8230j',
          ownername: 'qasem',
          age: 23,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          email: 'qasem@gamil.com',
          location: 'Irbid, Irbid',
          phoneNumber: '0798655626',
        },
        {
          _id: 'onhodfn-230890ui90i2-----j',
          ownername: 'obada',
          age: 53,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          email: 'obada@gamil.com',
          location: 'Aqaba, Aqaba',
          phoneNumber: '0798456456',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
