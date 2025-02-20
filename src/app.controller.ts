import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private service: AppService) { }

    @Get()
    getHallo() {
        return this.service.getHello();
    }

    @Post()
    gethallo() {
        return 'post';
    }
}
