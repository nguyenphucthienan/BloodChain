export class UrlUtils {

  static resolvePathVariables(url: string, params: any): string {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = params[key];
        url = url.replace(`{${key}}`, param);
      }
    }

    return url;
  }

}
