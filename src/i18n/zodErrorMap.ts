import { z, type ZodErrorMap } from 'zod';
import { i18n } from './index';

const errorMap: ZodErrorMap = (issue, ctx) => {
  if (issue.code === 'too_small' && issue.type === 'string') {
    return {
      message: i18n.t('validation.minLength', { count: Number(issue.minimum) }),
    };
  }
  if (issue.code === 'too_big' && issue.type === 'string') {
    return {
      message: i18n.t('validation.maxLength', { count: Number(issue.maximum) }),
    };
  }
  if (issue.code === 'invalid_string') {
    if (issue.validation === 'email') {
      return { message: i18n.t('validation.invalidEmail') };
    }
    if (issue.validation === 'url') {
      return { message: i18n.t('validation.invalidUrl') };
    }
  }
  if (issue.code === 'too_small' && issue.type === 'number') {
    return { message: i18n.t('validation.pricePositive') };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);
