class FakeUserRepo {
  constructor() { this.users = []; }
  save(user) { this.users.push(user); }
  findAll() { return this.users; }
}