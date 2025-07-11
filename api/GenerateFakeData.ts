import { faker } from "@faker-js/faker";
import { UserRole, UserTable } from "./src/DB_Schema/UserSchema";
import { connectDB, closeDB, ObjectID } from "./src/DB_Schema/connexion";
import { FilledRoom, Room } from "./src/Models/RoomModel";
import { RoomTable } from "./src/DB_Schema/RoomSchema";
import { hashSync } from "bcrypt";
import { hashPassword } from "./src/Services/auth/password";
import { User } from "./src/Models/UserModel";
import { bookASessions } from "./src/Services/sessions/sessions";
import { generateTimeSlots } from "./src/Services/sessions/room_sessions";
import { SessionTable } from "./src/DB_Schema/SessionsSchema";

let users: User[] = []
export async function GenerateFakeData() {
  await connectDB();
  console.log("Generating fake data...");

  users = await FakeUsers();
  console.log("Users generated...");

  await FakeRooms();
  console.log("Rooms generated...");

  await FakeSessions();
  console.log("Sessions generated...");

  await closeDB();
  console.log("Data generation completed!");
}

GenerateFakeData();

async function FakeUsers(): Promise<User[]> {
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

    const clientUser = new UserTable({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: "client@client.com",
        phone: faker.phone.number(),
        role: UserRole.client,
        password: await hashPassword("123456789"),
    });
    users.push(await clientUser.save());

    const employeeUser = new UserTable({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: "employee@employee.com",
        phone: faker.phone.number(),
        role: UserRole.employee,
        password: await hashPassword("123456789"),
    });
    users.push(await employeeUser.save());

  // Create 20 member users
    for (let i = 0; i < 20; i++) {
        const user = new UserTable({
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            role: UserRole.client,
            password: await hashPassword("123456789"),
        });
        users.push(await user.save());
    }
  return users;
}


async function FakeRooms() {
    //const roomDocs = rooms.map(({ _id, ...room }) => room);
    await RoomTable.insertMany(rooms);
}

async function FakeSessions() {
    const clientUsers = users.filter(u => u.role === UserRole.client);

    // Calcule le lundi de la semaine en cours
    const today = new Date();
    const weekDay = today.getDay();
    const diffToMonday = (weekDay + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    let sessionsCreated = 0;
    let attempts = 0;
    const maxSessions = 50;
    const maxAttempts = 1000;

    while (sessionsCreated < maxSessions && attempts < maxAttempts) {
        attempts++;

        const user = faker.helpers.arrayElement(clientUsers);
        const room = faker.helpers.arrayElement(rooms);

        // Jour de la semaine courante
        const dayOffset = faker.number.int({ min: 0, max: 6 });
        const date = new Date(monday);
        date.setDate(monday.getDate() + dayOffset);
        date.setHours(0, 0, 0, 0);

        const slots = generateTimeSlots(date, room.duration);
        if (slots.length === 0) continue;
        const slot = faker.helpers.arrayElement(slots);

        // Vérifie qu'il n'y a pas déjà une session pour cette room à ce créneau
        const existingSession = await SessionTable.findOne({
            room_id: room._id,
            start_time: slot,
        });
        if (existingSession) continue;

        // Vérifie que l'utilisateur n'a pas déjà une session à ce créneau
        const alreadyBook = await SessionTable.findOne({
            user_id: user._id,
            start_time: slot,
        });
        if (alreadyBook) continue;

        const participants = faker.number.int({ min: 2, max: room.max_participants });
        if (participants > room.max_participants) continue;

        // Save la session
        await new SessionTable({
            room_id: room._id,
            start_time: slot,
            participants,
            user_id: user._id
        }).save();

        sessionsCreated++;
    }

    console.log(`${sessionsCreated} fake sessions créées.`);
}


































export const rooms: FilledRoom[] = [
    {
        _id: "60f5a3b8c25e410001c9a001",
        name: "Asile 666",
        description: "Survivrez-vous à l’asile oublié ? Frissons garantis.",
        long_description: "Survivrez-vous à l’asile psychiatrique oublié où d’anciens patients hantent encore les couloirs ? Frissons garantis.",
        price: 18,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    },
    {
        _id: "60f5a3b8c25e410001c9a002",
        name: "La Crypte Maudite",
        description: "Explorez une crypte maudite et échappez à ses pièges mortels.",
        long_description: "Explorez une crypte maudite et échappez à ses pièges mortels. Une atmosphère sombre et angoissante garantie.",
        price: 14,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    },
    {
        _id: "60f5a3b8c25e410001c9a003",
        name: "Le Laboratoire Interdit",
        description: "Des expériences ont mal tourné… À vous d’en sortir.",
        long_description: "Entrez dans un laboratoire abandonné où d’étranges expériences ont mal tourné. Entre mutations et mystères, vous n’en ressortirez peut-être pas indemnes...",
        price: 17,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    },
    {
        _id: "60f5a3b8c25e410001c9a004",
        name: "Le Manoir du Diable",
        description: "Infiltrez un manoir abandonné et affrontez ses forces maléfiques.",
        long_description: "Infiltrez un manoir abandonné et affrontez les forces maléfiques qui y résident. Chaque porte peut être la dernière…",
        price: 16,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    },
    {
        _id: "60f5a3b8c25e410001c9a005",
        name: "La Mine Oubliée",
        description: "Explorez une galerie où les mineurs ont disparu...",
        long_description: "Plongez dans les profondeurs d’une ancienne mine où d’étranges disparitions ont été signalées. Les galeries sombres renferment bien plus que du charbon…",
        price: 15,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    },
    {
        _id: "60f5a3b8c25e410001c9a006",
        name: "Le Train Fantôme",
        description: "Un train maudit vous attend… oserez-vous monter à bord ?",
        long_description: "Montez à bord d’un train abandonné où le temps s’est figé. À chaque wagon, des visions cauchemardesques vous attendent... Trouverez-vous la sortie avant le terminus ?",
        price: 16,
        estimated_duration: 30,
        duration: 45,
        max_participants: 6,
        visible: true,
    }
]