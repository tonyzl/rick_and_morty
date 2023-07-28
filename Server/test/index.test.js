const server = require("../src/app"); // Nos traemos nuestro servidor
const session = require("supertest");
const agent = session(server);

describe("Test de RUTAS", () => {
  describe("GET /characters/:id", (done) => {
    it("Responde con status: 200", async () => {
      await agent.get("/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/character/2");

      const props = [
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image",
      ];

      props.forEach((prop) => {
        expect(response.body).toHaveProperty(prop);
      });
    });

    it("Si hay un error responde con status: 500", async () => {
      const response = await agent.get("/characters/828387");
      expect(response.statusCode).toBeGreaterThan(400);
    });
  });

  describe("GET /user/login", () => {
    it("GET with correct data, should return the access true", async () => {
      const response = await agent.get(
        "/user/login?email=ejemplo@gmail.com&password=123456"
      );
      const access = { access: true };
      // response.body --> lo que response el back --> {access: true/false}
      expect(response.body).toEqual(access);
    });

    it("GET with incorrect data, should return the access false", async () => {
      const response = await agent.get(
        "/user/login?email=ejemplo@gmail.com&password=abcdef"
      );
      expect(response.body.access).toEqual(false);
    });
  });

  describe("Favorites", () => {
    const character1 = { id: 1, name: "Messi" };
    const character2 = { id: 2, name: "Ronaldo" };

    describe("POST", () => {
      it("POST should add the character to the favs", async () => {
        const response = await agent.post("/favorites").send(character1);
        //   console.log(response.body); //  [ { id: 1, name: 'Messi' } ]
        expect(response.body).toContainEqual(character1);
      });

      it("POST should add the second character to the favs", async () => {
        const response = await agent.post("/favorites").send(character2);
        // console.log(response.body); //  [ { id: 1, name: 'Messi' }, { id: 2, name: "Ronaldo" } ]
        expect(response.body.length).toBe(2);
        expect(response.body).toContainEqual(character1);
        expect(response.body).toContainEqual(character2);
      });
    });

    describe("DELETE", () => {
      it("Should return the previous characters when sending wrong data", async () => {
        const response = await agent.delete("/favorites/68");
        // response body [ { id: 1, name: 'Messi' }, { id: 2, name: "Ronaldo" } ]
        expect(response.body).toContainEqual(character1);
        expect(response.body).toContainEqual(character2);
      });

      it("Should delete the character when sending correct information", async () => {
        const response = await agent.delete("/favorites/2");

        // response body [ { id: 1, name: 'Messi' }]
        expect(response.body).toContainEqual(character1); // "Espero que response.body tenga a character1"
        expect(response.body).not.toContainEqual(character2); // "Espero que response.body NO tenga a character2"
      });
    });
  });
});

// Expected {name: "Messi"} --- Recieved {name: "Messi"} ---> XXXXXXXXXXXXXXXXXXXXXXXXXX
