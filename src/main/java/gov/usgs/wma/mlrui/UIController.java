package gov.usgs.wma.mlrui;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UIController {
	@Value("${MLR_GATEWAY_HOST}")
	private String mlrGatewayHost;
	
	@Value("${MLR_GATEWAY_PORT}")
	private String mlrGatewayPort;
	
	@Value("${MLR_GATEWAY_UPLOAD_PATH}")
	private String mlrGatewayUploadPath;
	
	@Value("${MLR_GATEWAY_VALIDATE_PATH}")
	private String mlrGatewayValidatePath;
	
	@GetMapping("/")
	public String ui(Model model) {
		model.addAttribute("MLR_GATEWAY_HOST", mlrGatewayHost);
		model.addAttribute("MLR_GATEWAY_PORT", mlrGatewayPort);
		model.addAttribute("MLR_GATEWAY_UPLOAD_PATH", mlrGatewayUploadPath);
		model.addAttribute("MLR_GATEWAY_VALIDATE_PATH", mlrGatewayValidatePath);
		return "ui";
	}
}