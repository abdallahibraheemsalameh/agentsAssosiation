import jwtDecode from "jwt-decode";

export const state = () => ({
  booksWITHowners: [],
  count: 0,
  userToken: "",
});

export const mutations = {
  addPeople(state, payload) {
    state.booksWITHowners = [...payload.response];
    state.count = payload.count;
  },

  addEditedPeople(state, payload) {
    state.booksWITHowners = payload;
  },

  addSearchedPeople(state, payload) {
    state.booksWITHowners = [];
    state.booksWITHowners = payload.response;
    state.count = payload.count;
  },
  // Token 🎱🎱🎱🎱
  setToken(state) {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      state.userToken = jwt;
    } else state.userToken = "";
  },

  // Imgs mutations 🎱🎱🎱🎱
  // 🟢
  addImg(state, payload) {
    let bookid = payload.bookID;
    let img = payload.img;
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        state.booksWITHowners[i].imgs.push(img);
      }
    }
  },
  // 🟢
  editImg(state, payload) {
    let bookid = payload.bookID;
    let imgID = payload.imgID;
    let newUrl = payload.newUrl;
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        // state.booksWITHowners[i].imgs.push(img);
        for (let j = 0; j < element.imgs.length; j++) {
          const img = element.imgs[j];
          if (img.imgID === imgID) {
            state.booksWITHowners[i].imgs[j].imgURL = newUrl;
          }
        }
      }
    }
  },
  // 🟢
  deleteImg(state, payload) {
    let bookid = payload.bookID;
    let imgID = payload.imgID;
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        for (let j = 0; j < element.imgs.length; j++) {
          const img = element.imgs[j];
          if (img.imgID === imgID) {
            // state.booksWITHowners[i].imgs[j].imgURL = newUrl;
            state.booksWITHowners[i].imgs.splice(j, 1);
          }
        }
      }
    }
  },
  // 🟢
  // Owner mutations 🎱🎱🎱🎱
  // 🟢
  updateOwners(state, payload) {
    let ownerid = payload.ownerID;
    let bookid = payload.bookID;
    console.log(state.booksWITHowners);
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        for (let i = 0; i < element.owner.length; i++) {
          if (element.owner[i].ownerID === ownerid) {
            element.owner[i] = { ...payload };
            // state.booksWITHowners.owner.splice(i, 1);
            // element.owner.splice(i, 1);
          }
        }
      }
    }
  },
  // 🟢
  deleteOwner(state, payload) {
    let ownerid = payload.ownerID;
    let bookid = payload.bookID;
    // console.log(state.booksWITHowners);
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        for (let i = 0; i < element.owner.length; i++) {
          if (element.owner[i].ownerID === ownerid) {
            // element.owner[i] = { ...payload, recordStatus: "deleted" };
            element.owner.splice(i, 1);
          }
        }
      }
    }
  },
  // 🟢
  // Book mutations 🎱🎱🎱🎱
  // 🟢
  deleteBook(state, payload) {
    let bookid = payload.bookID;
    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        state.booksWITHowners.splice(i, 1);
      }
    }
  },
  // 🟢
  updateBook(state, payload) {
    let bookid = payload.bookID;
    let bookname = payload.bookname;
    let author = payload.author;
    let discription = payload.discription;

    for (let i = 0; i < state.booksWITHowners.length; i++) {
      const element = state.booksWITHowners[i];
      if (element.bookID === bookid) {
        state.booksWITHowners[i] = {
          ...element,
          bookname: bookname,
          author: author,
          discription: discription,
        };
      }
    }
  },
};
// 🟢
import axios from "axios";

export const actions = {
  // Display the books Cards 🎱🎱🎱🎱

  async getAllBooks({ commit }, payload) {
    const response = await axios.get(
      `http://localhost:5000/books/${payload.page}/${"null"}`
    );
    commit("addPeople", response.data);
  },
  // 🔴
  async getAllEditedBooks({ commit }, payload) {
    if (payload.searchData) {
      const response = await axios.get(
        `http://localhost:5000/books/${payload.page}/${payload.searchData}`
      );
      const store = await commit("addSearchedPeople", response.data);
    } else {
      const response = await axios.get(
        `http://localhost:5000/books/${payload.page}/${null}`
      );
      const store = await commit("addEditedPeople", response.data.response);
    }
  },
  // 🔴

  // Book Actions 🎱🎱🎱🎱

  async deleteBook({ commit }, payload) {
    const response = await axios.get(
      `http://localhost:5000/deleteBook/${payload.bookid}`
    );
    const response2 = await axios.get(
      `http://localhost:5000/books/${payload.pageNum}/${null}`
    );
    const store = await commit("deleteBook", { bookID: payload.bookid });
    const store2 = await commit("addPeople", response2.data);
  },
  // 🔴

  async addBook({ commit }, payload) {
    const response = await axios.post("http://localhost:5000/book", {
      bookname: payload.bookname,
      author: payload.author,
      discription: payload.discription,
      bookIMG: payload.bookIMG,
      owners: payload.owners,
      recordStatus: "latest",
    });
    commit("addPeople", {
      ...response.data,
      owner: payload.owners,
      imgs: payload.bookIMG,
    });
  },
  // 🔴

  // Search 🎱🎱🎱🎱
  // 🔴

  async getSearchResults({ commit }, payload) {
    const response = await axios.get(
      `http://localhost:5000/books/${payload.page}/${payload.searchData}`
    );
    console.log(response.data);
    commit("addSearchedPeople", response.data);
  },
  // 🔴

  // Imgs Actions 🎱🎱🎱🎱
  // 🔴

  async EditImg({ commit }, payload) {
    const bookID = payload.bookID;
    const imgID = payload.imgID;
    const newUrl = payload.newUrl;
    const response = await axios.post("http://localhost:5000/updateImg", {
      bookID: bookID,
      imgID: imgID,
      newUrl: newUrl,
    });
    if (response) {
      commit("editImg", {
        imgID: payload.imgID,
        bookID: payload.bookID,
        newUrl: payload.newUrl,
      });
    } else {
      console.log("Error updating image");
    }
  },
  // 🔴

  async deleteImg({ commit }, payload) {
    const bookID = payload.bookID;
    const imgID = payload.imgID;
    const response = await axios.post("http://localhost:5000/deleteImg", {
      bookID: bookID,
      imgID: imgID,
    });
    if (response) {
      commit("deleteImg", {
        imgID: payload.imgID,
        bookID: payload.bookID,
      });
    } else {
      console.log("Error updating image");
    }
  },
  // 🔴

  // Token Action 🎱🎱🎱🎱
  // 🔴

  async setToken({ commit }) {
    commit("setToken");
  },
  // 🔴
};

export const getters = {
  allBooks(state) {
    return state.booksWITHowners;
  },
  bookCount(state) {
    return state.count;
  },
  getToken(state) {
    // console.log(state.userToken);
    if (state.userToken) return jwtDecode(state.userToken);
    return null;
  },
  getTokenLocal() {
    return localStorage.getItem("JWT");
  },
};
