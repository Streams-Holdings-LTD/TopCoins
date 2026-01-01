// Stub for thread-stream to avoid bundling server-only transport in the browser
function ThreadStream() {
  throw new Error('thread-stream is not available in this build')
}

module.exports = ThreadStream
module.exports.default = ThreadStream
