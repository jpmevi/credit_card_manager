import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { ExampleProvider } from '../../providers/example/example.provider';
import { ExampleTransformer } from '../../transformers/Example.tranformer';
import {
  CreateExampleDto,
  FilterExampleDto,
  UpdateExampleDto,
} from '../../dtos/example.dto';
import ExampleRepository from '../../repositories/Example.repository';
import { Example } from '../../entities/Example.entity';
import { ExampleStatus } from './example.types';

@Injectable()
export class ExampleService {
  constructor(
    private exampleRepository: ExampleRepository,
    private exampleProvider: ExampleProvider,
    private exampleTransformer: ExampleTransformer,
  ) {}

  /**
   * Return all data from Example table optionally with filters
   * @param {FilterExampleDto} params
   * @returns {Promise<Example[]>}
   */
  async findAll(params?: FilterExampleDto): Promise<Example[]> {
    if (params.limit && params.offset) {
      const { limit, offset } = params;
      return await this.exampleRepository.find({
        take: limit,
        skip: offset,
      });
    }
    return await this.exampleRepository.find();
  }

  /**
   * Return all example names and status from Example table optionally with filters
   * @param {FilterExampleDto} params
   * @returns {Promise<ExampleStatus[]>}
   */
  async findAllStatus(params?: FilterExampleDto): Promise<ExampleStatus[]> {
    if (params.limit && params.offset) {
      const { limit, offset } = params;
      const examples = await this.exampleRepository.find({
        take: limit,
        skip: offset,
      });
      return this.exampleTransformer.exampleStatus(examples);
    }
    const examples = await this.exampleRepository.find();
    return this.exampleTransformer.exampleStatus(examples);
  }
  /**
   * Return a Example data found by id
   * @param {number} id
   * @returns {Promise<Example>}
   */
  async findOne(id: number): Promise<Example> {
    const example = await this.exampleRepository.findOne(id);
    if (!example) {
      throw new NotFoundException(`Example ${id} not found`);
    }
    return example;
  }

  /**
   * Create a register in Example table
   * @param {CreateExampleDto} data
   * @returns {Promise<Example>}
   */
  async create(data: CreateExampleDto): Promise<Example> {
    const newExample = this.exampleRepository.create(data);
    return await this.exampleRepository.save(newExample);
  }

  /**
   * Update a register with data passed by parameter and it found by id
   * @param {number} id
   * @param {UpdateExampleDto} data
   * @returns {Promise<Example>}
   */
  async update(id: number, data: UpdateExampleDto): Promise<Example> {
    const example = await this.exampleRepository.findOne(id);
    this.exampleRepository.merge(example, data);
    return await this.exampleRepository.save(example);
  }

  /**
   * Set delete_at field from Example register found by id
   * @param {number} id
   * @returns {Promise<UpdateResult>}
   */
  async remove(id: number): Promise<UpdateResult> {
    return await this.exampleRepository.softDelete(id);
  }

  /**
   * Search movie info by id
   * @param {number} id
   * @returns {Promise<any>}
   */
  async getMovieExample(id: number): Promise<any> {
    return await this.exampleProvider.getMoviesById(id);
  }
}
