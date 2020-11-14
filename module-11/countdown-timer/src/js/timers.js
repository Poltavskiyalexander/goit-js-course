import CountdownTimer from './CountdownTimer';

const newYear = new CountdownTimer({
  selector: '#new',
  targetDate: new Date('01 01, 2021 00:00:00'),
  autoStart: true,
});

const old = new CountdownTimer({
  selector: '#old',
  targetDate: new Date('01 12, 2020 00:10:00'),
  autoStart: true,
});

const myGirlfriendBirthday = new CountdownTimer({
  selector: '#my-girlfriends-birthday',
  targetDate: new Date('11 30, 2020 00:00:00'),
  autoStart: true,
});
