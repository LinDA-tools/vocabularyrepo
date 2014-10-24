from types import NoneType
from django import template
from linda_app.models import Vocabulary, VocabularyClass, VocabularyProperty
from linda_app.settings import LINDA_HOME

register = template.Library()


@register.filter(name="nice_name")
def nice_name(user):
    return user.get_full_name() or user.username

@register.filter(name="vocabularies")
def vocabularies(objects):
    return [elem for elem in objects if isinstance(elem.object, Vocabulary) or isinstance(elem, Vocabulary)]

@register.filter(name="classes")
def vocabulary_classes(objects):
    return [elem for elem in objects if isinstance(elem.object, VocabularyClass) or isinstance(elem, VocabularyClass)]

@register.filter(name="properties")
def vocabulary_properties(objects):
    return [elem for elem in objects if isinstance(elem.object, VocabularyProperty) or isinstance(elem, VocabularyProperty)]

@register.filter(name="get_endpoint")
def get_endpoint(datasource):
    if datasource.is_public:
        return datasource.uri
    else:
        return LINDA_HOME + "sparql/" + datasource.name + "/"