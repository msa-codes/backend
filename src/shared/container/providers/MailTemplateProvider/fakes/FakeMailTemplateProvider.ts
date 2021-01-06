import IParseMailTemplateProvider from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
  }: IParseMailTemplateProvider): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
