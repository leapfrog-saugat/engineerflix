import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EngineersService } from './engineers.service';
import { Engineer } from './entities/engineer.entity';
import { CreateEngineerDto } from './dto/create-engineer.dto';

@Controller('engineers')
export class EngineersController {
  constructor(private readonly engineersService: EngineersService) {}

  @Get()
  findAll(@Query('specialty') specialty?: string) {
    if (specialty) {
      return this.engineersService.findBySpecialty(specialty);
    }
    return this.engineersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineersService.findOne(id);
  }

  @Post()
  create(@Body() engineer: Partial<Engineer>) {
    return this.engineersService.create(engineer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() engineer: Partial<Engineer>) {
    return this.engineersService.update(id, engineer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineersService.remove(id);
  }

  @Post('test')
  async createTestEngineer() {
    const testEngineer: CreateEngineerDto = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      primary_category_id: "1",
      years_of_experience: 5,
      seniority_level: "senior",
      availability_status: "available",
      profile_image_url: "https://example.com/jane-smith.jpg",
      profile_video_url: "https://example.com/jane-smith-intro.mp4",
      rating: 4.5,
      github_url: "https://github.com/janesmith",
      linkedin_url: "https://linkedin.com/in/janesmith",
      portfolio_url: "https://janesmith.dev",
      bio: "Senior Frontend Engineer with 5 years of experience",
      skills: [
        {
          skill_name: "React",
          proficiency_level: 9,
          years_of_experience: 4
        },
        {
          skill_name: "TypeScript",
          proficiency_level: 8,
          years_of_experience: 3
        }
      ],
      subcategories: [
        {
          id: "1",
          is_primary: true,
          subcategory: {
            id: "1",
            name: "Frontend Development",
            type: "role",
            description: "Frontend web development",
            iconUrl: "https://example.com/icons/frontend.svg"
          }
        }
      ]
    };

    return this.engineersService.create(testEngineer);
  }

  @Get('test')
  async getTestEngineer() {
    return this.engineersService.findOne("1");
  }
} 