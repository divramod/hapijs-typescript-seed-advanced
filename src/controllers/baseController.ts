import * as Hapi from "hapi";


export default class BaseController {
  protected server: Hapi.Server;

  constructor(server: Hapi.Server) {
    this.server = server;
  }

  protected logInfo(message: string){
    /* $lab:coverage:off$ */
    this.server.log('info', message);
    /* $lab:coverage:on$ */
  }

  protected logError(message: string){
    /* $lab:coverage:off$ */
    this.server.log('error', message);
    /* $lab:coverage:on$ */
  }
}
