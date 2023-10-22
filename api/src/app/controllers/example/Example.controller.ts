import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateExampleDto,
  FilterExampleDto,
  UpdateExampleDto,
} from '../../dtos/example.dto';
import { ExampleService } from '../../services/example/Example.service';

@ApiTags('example')
@Controller('v1/example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}
  @Get()
  findAll(@Query() query: FilterExampleDto) {
    return this.exampleService.findAll(query);
  }
  @Get('status')
  findAllStatus(@Query() query: FilterExampleDto) {
    return this.exampleService.findAllStatus(query);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exampleService.findOne(id);
  }

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedExampleDto: UpdateExampleDto,
  ) {
    return this.update(id, updatedExampleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exampleService.remove(id);
  }

  @Get('movie/:id')
  getMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.exampleService.getMovieExample(id);
  }
}
