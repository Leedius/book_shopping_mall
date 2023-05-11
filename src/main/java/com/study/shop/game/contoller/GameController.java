package com.study.shop.game.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/game")
public class GameController {

	@GetMapping("/gameMain")
	public String gameMainPage() {
		return "/content/game/game_main";
	}
}
