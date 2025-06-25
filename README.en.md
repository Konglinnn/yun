# CranePaint Cloud Rhyme — Ancient Style Interactive Picture Book + ICH Guide AI Assistant  

## Project Introduction  
This project is developed based on WeChat Mini Program and AI Agent. Leveraging the generative capabilities of language models, it provides users with an integrated experience of **ICH exploration, interactive picture book reading, and community communication**. By merging digital technology with traditional culture, we build an elegant ancient-style online platform, allowing users to appreciate the beauty of Chinese ICH through interaction.  

## Function Overview  
- Interactive picture book reading + mission challenges (chapter-based plots + AI narration)  
- ICH collection atlas + cultural interpretation (in-depth historical background and craft value)  
- Community creative square (supports work publishing and interaction)  
- Learning achievement system (badge unlocking and display)  
- AI assistant interactive guidance (Role "Wen Xiaohe": ICH explanation, picture book companion reading, and fun interaction)  

## Technology Stack  
- WeChat Mini Program (front-end development)  
- SiliconFlow API (AI model invocation)  
- Cursor IDE (AI-assisted coding)  
- Doubao / Jimeng AI (image and icon generation)  
- V0 (interface prototype design)  

## Usage Instructions  
1. Open WeChat → Scan the QR code to enter the mini program  
2. Switch functional areas via bottom TABs: [Huimeng Pavilion] Picture Book Reading / [Zhencui Pavilion] Collection Appreciation / [Lechuang Collection] Community Interaction / [Huayun Album] Achievement Display  
3. Click the little crane icon on the home page to enter the "Wen Xiaohe" AI assistant dialogue interface  
4. Participate in interactive tasks, view collection details, or publish community content  

## Project Links  
- WeChat Mini Program preview: actual access via QR code  
- GitHub repository: https://github.com/Konglinnn/yun.git 

## AI Agent Setting Summary  
- Role: "Wen Xiaohe", an ICH cultural assistant with a personified crane image  
- Personality: Gentle, friendly, playful, blending ancient elegance with modern affinity  
- Tasks: Provide ICH knowledge explanation, picture book narration, and fun interactions (e.g., word puzzles, couplet generation) based on user input. Dialogue example:  
> "Ding dong～Wen Xiaohe reports! Shall we explore the ancient rhymes together today? Which ICH collection story would you like to know, little friend?"  

## Project Structure Description  
/miniprogram # Mini Program code
├── pages # Functional pages (Huimeng Pavilion/Zhencui Pavilion/Lechuang Collection/Huayun Album)
├── utils # Tool functions (API invocation, data processing)
├── assets # Material resources (ancient-style icons, picture book images)
├── components # Custom components (dialogue bubbles, collection cards)
README.md # Project guide (main file)
README.zh-CN.md # Chinese documentation
README.en.md # English documentation

## Running Instructions  
1. Clone the GitHub repository to your local device  
2. Open the `/miniprogram` directory with WeChat Developer Tools  
3. Configure the legal domain `https://api.siliconflow.cn` in `project.config.json`  
4. Enter the SiliconFlow API key, then debug and run (real-device preview recommended)  

## License  
MIT License  
