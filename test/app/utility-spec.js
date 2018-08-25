import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Utility from '../../src/util/utility';

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

describe('Utility spec', () => {
  it('should delay', async () => {
    const start = new Date();
    const delayedTime = await Utility.delay(100);
    const diff = delayedTime - start;

    console.log("diff: ", diff);
    expect(diff).to.be.above(100);
  });
});
