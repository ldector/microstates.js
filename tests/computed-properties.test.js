import 'jest';
import { create } from 'microstates';

class State {
  firstName = String;
  lastName = String;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toUpperCase() {
    return this
      .firstName.set(this.state.firstName.toUpperCase())
      .lastName.set(this.state.lastName.toUpperCase());
  }
}

describe('without initial state', () => {
  let ms;
  beforeEach(() => {
    ms = create(State);
  });
  it('is computed', function() {
    expect(ms.state.fullName).toEqual(' ');
  });
});
describe('with initial state', () => {
  let ms;
  beforeEach(() => {
    ms = create(State, { firstName: 'Peter', lastName: 'Griffin' });
  });
  it('is computed', () => {
    expect(ms.state.fullName).toEqual('Peter Griffin');
  });
  it('should not have getters in valueOf after custom transition', () => {
    expect(ms.toUpperCase().valueOf()).not.toHaveProperty('fullName');
  });
});