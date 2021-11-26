import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CrudTestController } from "./crudTest.controller";
import { CrudTestService } from "./crudTest.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CrudSchema } from "src/Schema/crud_schema";
import { testMiddlewere } from "src/util/test.middlewere";
import { UserSchema } from "src/Schema/userSchema";
import { AdminSchema } from "src/Schema/adminSchema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Crud", schema: CrudSchema },
    ]),
  ],
  controllers: [CrudTestController],
  providers: [CrudTestService],
})
// export class CrusTestModule {}
export class CrusTestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(testMiddlewere).forRoutes("crud");
  }
}
