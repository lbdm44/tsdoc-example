import Car from './car';
import Motorcycle from './motorcycle';

function main(): void {
  let c = new Car();
  let m = new Motorcycle();

  console.log(c.wheels);
  console.log(m.wheels);
}

main();
