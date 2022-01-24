export function formatVehicle(type: string, wheels: number) {
  return `I'm a ${type} and have ${wheels} wheels`;
}

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
    return formatVehicle(this.type, this.wheels);
  }
}

export default Vehicle;
