import { Subjects, Publisher, ExpirationCompleteEvent } from '@getickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}