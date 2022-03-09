import fs from "fs";

export class formService {
  constructor(http, token, path) {
    this.http = http;
    this.token = token;
    this.path = path;
  }

  async requestWithBody(method, url, data) {
    const response = await this.http.fetch(url, {
      method: method,
      headers: {
        cookie: `token=${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async createDirectory(name) {
    const isexist = fs.existsSync(`./uploads/${this.path}/${this.path}_${name}`);
    if (isexist) throw new Error("중복된 id의 폴더가 존재");
    fs.mkdirSync(`./uploads/${this.path}/${this.path}_${name}`);
  }

  moveTempFileToOwnFolder(filename, name) {
    fs.rename(
      `./uploads/${this.path}/${this.path}_temp/${filename}`,
      `./uploads/${this.path}/${this.path}_${name}/${filename}`,
      (err) => {
        if (err) throw new Error("파일 이동 실패");
      }
    );
  }

  deleteFile(name, filename) {
    fs.unlink(`./uploads/${this.path}/${this.path}_${name}/${filename}`, (err) => console.error(err));
  }
}
