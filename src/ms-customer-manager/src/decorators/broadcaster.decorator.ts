import { Inject } from "@nestjs/common";

export const BROADCASTER_TOKEN = 'BROADCASTER';

export function InjectBroadcaster(): (target: object, key: string | symbol | undefined, index?: number) => void {
  return Inject(BROADCASTER_TOKEN);
}
