import { Injectable } from '@angular/core';
import { PartOfString } from 'src/app/ui/urls-parser/part-of-string';
import * as urlRegex from 'url-regex';

@Injectable()
export class UrlsParserService {

  public parse(str: string): PartOfString[] {
    const urls = str.match(urlRegex()) || [];

    if (urls.length === 0) {
      return [new PartOfString(str, false)];
    }

    const result: PartOfString[] = [];
    let tmpStr = str;
    urls.forEach(url => {
      const index = tmpStr.indexOf(url);
      if (index > 0) {
        const leftText = tmpStr.slice(0, index);
        result.push(new PartOfString(leftText, false));
      }

      result.push(new PartOfString(url, true));
      tmpStr = tmpStr.slice(url.length + index);
    });

    return result;
  }
}
