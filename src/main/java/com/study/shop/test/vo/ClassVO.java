package com.study.shop.test.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ClassVO {
	@JsonProperty("tea_name")
	private String teaName; 
	
	@JsonProperty("class_name")
	private String className;
	
	@JsonProperty("stu_list")
	private List<StudentVO> stuList;
}
