import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(5);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(10)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(10)).toThrow(
      'Insufficient funds: cannot withdraw more than 5',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const anotherAccount = getBankAccount(5);
    expect(() => account.transfer(10, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(5, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(10);
    expect(account.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    account.withdraw(3);
    expect(account.getBalance()).toBe(2);
  });

  test('should transfer money', () => {
    const anotherAccount = getBankAccount(10);
    account.transfer(2, anotherAccount);
    expect(account.getBalance()).toBe(3);
    expect(anotherAccount.getBalance()).toBe(12);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(25);
    const balance = await account.fetchBalance();
    expect(balance).toBe(25);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(45);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(45);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
