import * as R from 'ramda'

const Map = R.addIndex(R.map)

const Block = (blockSize, array) => R.splitEvery(blockSize, array)

export { Map, Block }
