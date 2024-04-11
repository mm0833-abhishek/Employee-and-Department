namespace my.bookshop;

entity Employees {
 key Employee_Id:String;
  Employee_First_Name:String;
  Employee_Last_Name:String;
  Employee_Full_Name:String= Employee_First_Name || ' ' || Employee_Last_Name;
  Employee_Phone_Number:String;
  Employee_Department_ID:String;
  Department:Association to many Departments on Department.Department_Id = $self.Employee_Department_ID;
}

entity Departments {
key Department_Id:String;
Department_Name:String;
Head_Of_Department:String;
Employee :Association to many Employees on Employee.Employee_Department_ID = $self.Department_Id;
}
