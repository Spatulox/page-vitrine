import type { Room } from "./Escape/Rooms";

export const rooms: Room[] = [
    {
        _id: 0,
        name: "Asile 666",
        description: "Survivrez-vous à l’asile oublié ? Frissons garantis.",
        long_description: "Survivrez-vous à l’asile psychiatrique oublié où d’anciens patients hantent encore les couloirs ? Frissons garantis.",
        price: 18
    },
    {
        _id: 1,
        name: "La Crypte Maudite",
        description: "Explorez une crypte maudite et échappez à ses pièges mortels.",
        long_description: "Explorez une crypte maudite et échappez à ses pièges mortels. Une atmosphère sombre et angoissante garantie.",
        price: 14
    },
    {
        _id: 2,
        name: "Le Laboratoire Interdit",
        description: "Des expériences ont mal tourné… À vous d’en sortir.",
        long_description: "Entrez dans un laboratoire abandonné où d’étranges expériences ont mal tourné. Entre mutations et mystères, vous n’en ressortirez peut-être pas indemnes...",
        price: 17
    },
    {
        _id: 3,
        name: "Le Manoir du Diable",
        description: "Infiltrez un manoir abandonné et affrontez ses forces maléfiques.",
        long_description: "Infiltrez un manoir abandonné et affrontez les forces maléfiques qui y résident. Chaque porte peut être la dernière…",
        price: 16
    },
    {
        _id: 4,
        name: "La Mine Oubliée",
        description: "Explorez une galerie où les mineurs ont disparu...",
        long_description: "Plongez dans les profondeurs d’une ancienne mine où d’étranges disparitions ont été signalées. Les galeries sombres renferment bien plus que du charbon…",
        price: 15
    },
    {
        _id: 5,
        name: "Le Train Fantôme",
        description: "Un train maudit vous attend… oserez-vous monter à bord ?",
        long_description: "Montez à bord d’un train abandonné où le temps s’est figé. À chaque wagon, des visions cauchemardesques vous attendent... Trouverez-vous la sortie avant le terminus ?",
        price: 16
    }
];
