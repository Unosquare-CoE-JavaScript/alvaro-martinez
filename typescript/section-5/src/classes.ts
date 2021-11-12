class Department {
  static fiscalYear = 2021;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    this.name = name;
  }

  describe() {
    console.log('Department: ' + this.name);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDeparment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No error found.');
  }

  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error('Please pass a valid report');
    }
    this.addReport(report);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name.toLocaleLowerCase() === 'max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  getReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('alvaro');
console.log(employee1);

const it = new ITDepartment('1', ['Max']);

// console.log(it.describe());

it.addEmployee('alvaro');
it.addEmployee('Diana');
it.addEmployee('Lumine');
it.addEmployee('Paimon');

// it.employees[4] = 'Venti'; its private and cant modify this property from outside

it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDeparment('2', []);

accounting.addReport('some wrong');
accounting.addReport('news');

accounting.getReports();
