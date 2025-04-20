const characters = [
  {
    name: "SNEK-BOT",
    image: "images/snek-bot.png",
    description: "Omnibot 3.0 now features true human emotion, bouts of madness, and a can opener!",
    unlock: "Event Exclusive Skin"
  },
  {
    name: "Glow",
    image: "images/glow.png",
    description: "A radiant snake that lights up the arena.",
    unlock: "Starts Unlocked"
  },
  {
    name: "Ube",
    image: "images/ube.png",
    description: "I loooove sweets! One day, I'll try them all.",
    unlock: "Play 15 Games"
  },
  {
    name: "Rocket Boy",
    image: "images/rocket-boy.png",
    description: "A space-themed snake from the 'Snakes in Space' event.",
    unlock: "Event Exclusive Skin"
  },
  {
    name: "King Cold",
    image: "images/king-cold.png",
    description: "A legendary snake from the 'Frozen Crown' event.",
    unlock: "Event Exclusive Skin"
  }
];

const container = document.getElementById("characters-container");

characters.forEach(char => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = char.image;
  img.alt = char.name;

  const content = document.createElement("div");
  content.className = "card-content";

  const name = document.createElement("h3");
  name.textContent = char.name;

  const desc = document.createElement("p");
  desc.textContent = char.description;

  const unlock = document.createElement("p");
  unlock.textContent = `Unlock: ${char.unlock}`;

  content.appendChild(name);
  content.appendChild(desc);
  content.appendChild(unlock);

  card.appendChild(img);
  card.appendChild(content);

  container.appendChild(card);
});
