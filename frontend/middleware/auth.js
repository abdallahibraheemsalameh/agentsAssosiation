export default function ({ store, redirect }) {
  console.log(store.getters["getToken"]);
  const token = store.getters["getToken"];
  if (!token) {
    return redirect("/Login");
  }
}
