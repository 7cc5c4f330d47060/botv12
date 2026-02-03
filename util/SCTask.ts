export default class SCTask {
  failTask: () => void
  failed: boolean

  constructor (failTask: () => void, startFailed = false) {
    /*
         * failed: Whether to run this task
         * failTask: Command to run when failed is true
    */
    this.failed = startFailed
    this.failTask = failTask
  }
}