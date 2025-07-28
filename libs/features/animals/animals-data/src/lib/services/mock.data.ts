import { AnimalsModel } from '../models';

export const favoriteAnimals: AnimalsModel = {
  animals: [
    {
      id: '1',
      name: 'Red Panda',
      description:
        'The red panda, also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has reddish-brown fur, a long, shaggy tail, and a waddling gait due to its shorter front legs. It is not closely related to the giant panda.',
      gallery: [
        'assets/images/animals/red-panda/1.jpeg',
        'assets/images/animals/red-panda/2.jpeg',
        'assets/images/animals/red-panda/3.jpeg',
      ],
    },
    {
      id: '2',
      name: 'Racoon',
      description:
        'The raccoon is a medium-sized mammal native to North America. It is easily recognized by its black mask of fur around its eyes and its bushy tail with black rings. Raccoons are known for their intelligence and dexterity, often using their front paws to manipulate objects.',
      gallery: [
        'assets/images/animals/racoon/1.jpeg',
        'assets/images/animals/racoon/2.jpeg',
        'assets/images/animals/racoon/3.jpeg',
      ],
    },
  ],
};

export const animalOfDay: AnimalsModel = {
  animals: [
    {
      id: '3',
      name: 'Fennec Fox',
      description:
        'The fennec fox is a small nocturnal fox native to the Sahara Desert and the Sinai Peninsula. Known for its oversized ears, which help dissipate heat, it has a creamy-colored coat and a bushy tail. Fennec foxes are highly social and known for their playful behavior.',
      gallery: [
        'assets/images/animals/fennec-fox/1.jpeg',
        'assets/images/animals/fennec-fox/2.jpeg',
        'assets/images/animals/fennec-fox/3.jpeg',
      ],
    },
    {
      id: '4',
      name: 'Sloth',
      description:
        'Sloths are slow-moving mammals found in the rainforests of Central and South America. They have long limbs, curved claws, and a distinctive face with a perpetual smile. Sloths spend most of their lives hanging upside down in trees, moving slowly to conserve energy.',
      gallery: [
        'assets/images/animals/sloth/1.jpeg',
        'assets/images/animals/sloth/2.jpeg',
        'assets/images/animals/sloth/3.jpeg',
      ],
    },
    {
      id: '5',
      name: 'Axolotl',
      description:
        'The axolotl is a unique amphibian native to Mexico, known for its remarkable regenerative abilities, allowing it to regrow limbs and even parts of its heart. It has a distinctive appearance with feathery gills and a wide, flat head, often found in shades of pink or albino.',
      gallery: [
        'assets/images/animals/axolotl/1.jpeg',
        'assets/images/animals/axolotl/2.jpeg',
        'assets/images/animals/axolotl/3.jpeg',
      ],
    },
  ],
};
