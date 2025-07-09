import { faker } from "@faker-js/faker";
import { UserRole, UserTable } from "./src/DB_Schema/UserSchema";
import { connectDB, closeDB } from "./src/DB_Schema/connexion";
import { FilledRoom, Room } from "./src/Models/RoomModel";
import { RoomTable } from "./src/DB_Schema/RoomSchema";
import { hashSync } from "bcrypt";
import { hashPassword } from "./src/Services/auth/password";

export async function GenerateFakeData() {
  await connectDB();
  console.log("Generating fake data...");

  const users = await FakeUsers();
  console.log("Users generated...");

  await FakeRooms();
  console.log("Rooms generated...");

  await closeDB();
  console.log("Data generation completed!");
}

GenerateFakeData();

async function FakeUsers() {
    const users = [];

    const adminUser = new UserTable({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: "admin@admin.com",
        phone: faker.phone.number(),
        role: UserRole.admin,
        password: await hashPassword("123456789"),
    });
    users.push(await adminUser.save());

  // Create 20 member users
    for (let i = 0; i < 20; i++) {
        const user = new UserTable({
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            role: UserRole.client,
            password: await hashPassword(faker.internet.password()),
        });
        users.push(await user.save());
    }
  return users;
}


async function FakeRooms() {
    const roomDocs = rooms.map(({ _id, ...room }) => room);
    await RoomTable.insertMany(roomDocs);
}




































export const rooms: FilledRoom[] = [
    {
        _id: "0",
        name: "Asile 666",
        description: "Survivrez-vous à l’asile oublié ? Frissons garantis.",
        long_description: "Survivrez-vous à l’asile psychiatrique oublié où d’anciens patients hantent encore les couloirs ? Frissons garantis.",
        price: 18,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    },
    {
        _id: "1",
        name: "La Crypte Maudite",
        description: "Explorez une crypte maudite et échappez à ses pièges mortels.",
        long_description: "Explorez une crypte maudite et échappez à ses pièges mortels. Une atmosphère sombre et angoissante garantie.",
        price: 14,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    },
    {
        _id: "2",
        name: "Le Laboratoire Interdit",
        description: "Des expériences ont mal tourné… À vous d’en sortir.",
        long_description: "Entrez dans un laboratoire abandonné où d’étranges expériences ont mal tourné. Entre mutations et mystères, vous n’en ressortirez peut-être pas indemnes...",
        price: 17,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    },
    {
        _id: "3",
        name: "Le Manoir du Diable",
        description: "Infiltrez un manoir abandonné et affrontez ses forces maléfiques.",
        long_description: "Infiltrez un manoir abandonné et affrontez les forces maléfiques qui y résident. Chaque porte peut être la dernière…",
        price: 16,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    },
    {
        _id: "4",
        name: "La Mine Oubliée",
        description: "Explorez une galerie où les mineurs ont disparu...",
        long_description: "Plongez dans les profondeurs d’une ancienne mine où d’étranges disparitions ont été signalées. Les galeries sombres renferment bien plus que du charbon…",
        price: 15,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    },
    {
        _id: "5",
        name: "Le Train Fantôme",
        description: "Un train maudit vous attend… oserez-vous monter à bord ?",
        long_description: "Montez à bord d’un train abandonné où le temps s’est figé. À chaque wagon, des visions cauchemardesques vous attendent... Trouverez-vous la sortie avant le terminus ?",
        price: 16,
        estimated_duration: 30,
        duration: 45,
        participants: 8,
        max_participants: 12,
    }
]