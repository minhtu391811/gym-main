import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { PageDto } from '../../../modules/pagination/dto/page.dto';

export class GetListRoomDto extends PageDto {
  @ApiProperty({ required: false, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;

  @ApiProperty({ required: false })
  field: string;

  @ApiProperty({ required: false, enum: TypeEnumLabel, type: 'string' })
  type: string;

  @ApiProperty({ required: false })
  value: string;
}

export class CreateRoomDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  description?: string;
}
