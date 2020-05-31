module.exports = {
  name: 'programming-kitchen',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/programming-kitchen',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
