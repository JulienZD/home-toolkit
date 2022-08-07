import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  @IsAlphanumeric()
  username!: string;

  @MinLength(10)
  @IsString()
  password!: string;
}
