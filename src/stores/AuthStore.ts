import { makeAutoObservable } from "mobx";

class AuthStore {
  phone: string = "";
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this); // Автоматически делает всё наблюдаемым
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  confirmCode(code: string) {
    // На этом этапе ты можешь проверить код (захардкоженный, например "1234")
    if (code.length === 4) {
      this.isAuthenticated = true;
    }
  }

  logout() {
    this.phone = "";
    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;