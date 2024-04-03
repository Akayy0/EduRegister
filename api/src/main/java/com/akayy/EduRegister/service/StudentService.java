package com.akayy.EduRegister.service;

import com.akayy.EduRegister.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
