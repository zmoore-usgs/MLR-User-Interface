package gov.usgs.wma.mlrui;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UIController {
	@Value("${mlrGatewayHost}")
	private String mlrGatewayHost;
	
	@Value("${mlrGatewayPort}")
	private String mlrGatewayPort;
	
	@Value("${mlrGatewayUploadPath}")
	private String mlrGatewayUploadPath;
	
	@GetMapping("/")
	public String ui(Model model) {
		model.addAttribute("mlrGatewayHost", mlrGatewayHost);
		model.addAttribute("mlrGatewayPort", mlrGatewayPort);
		model.addAttribute("mlrGatewayUploadPath", mlrGatewayUploadPath);
		return "ui";
	}
}