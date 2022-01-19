abstract class Vehicle {
  /**
   * Indicates what type of vehicle this is.
   */
  abstract type: string;

  /**
   * Indicates how many wheels this vehicle has.
   */
  abstract wheels: number;

  /**
   * @override
   * @returns A human readable description of this vehicle.
   */
  toString() {
    return `I'm a ${this.type} and have ${this.wheels} wheels`;
  }
}

export default Vehicle;
