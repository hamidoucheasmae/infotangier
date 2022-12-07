/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//////////////////////////////////////
// THIS FILE HAS GLOBAL SIDE EFFECT //
//       (see bottom of file)       //
//////////////////////////////////////
/**
 * @module
 * @description
 * Entry point for all APIs of the compiler package.
 *
 * <div class="callout is-critical">
 *   <header>Unstable APIs</header>
 *   <p>
 *     All compiler apis are currently considered experimental and private!
 *   </p>
 *   <p>
 *     We expect the APIs in this package to keep on changing. Do not rely on them.
 *   </p>
 * </div>
 */
import * as core from './core';
import { publishFacade } from './jit_compiler_facade';
import { global } from './util';
export { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from './core';
export { core };
export * from './version';
export { CompilerConfig, preserveWhitespacesDefault } from './config';
export * from './resource_loader';
export { ConstantPool } from './constant_pool';
export { DEFAULT_INTERPOLATION_CONFIG, InterpolationConfig } from './ml_parser/interpolation_config';
export * from './schema/element_schema_registry';
export * from './i18n/index';
export * from './expression_parser/ast';
export * from './expression_parser/lexer';
export * from './expression_parser/parser';
export * from './ml_parser/ast';
export * from './ml_parser/html_parser';
export * from './ml_parser/html_tags';
export * from './ml_parser/interpolation_config';
export * from './ml_parser/tags';
export { ParseTreeResult, TreeError } from './ml_parser/parser';
export * from './ml_parser/xml_parser';
export { ArrayType, DYNAMIC_TYPE, BinaryOperator, BinaryOperatorExpr, BuiltinType, BuiltinTypeName, CommaExpr, ConditionalExpr, DeclareFunctionStmt, DeclareVarStmt, Expression, ExpressionStatement, ExpressionType, ExternalExpr, ExternalReference, literalMap, FunctionExpr, IfStmt, InstantiateExpr, InvokeFunctionExpr, LiteralArrayExpr, LiteralExpr, LiteralMapExpr, MapType, NotExpr, NONE_TYPE, ReadKeyExpr, ReadPropExpr, ReadVarExpr, ReturnStatement, TaggedTemplateExpr, TemplateLiteral, TemplateLiteralElement, Type, TypeModifier, WrappedNodeExpr, WriteKeyExpr, WritePropExpr, WriteVarExpr, StmtModifier, Statement, STRING_TYPE, TypeofExpr, jsDocComment, leadingComment, LeadingComment, JSDocComment, UnaryOperator, UnaryOperatorExpr, LocalizedString } from './output/output_ast';
export { EmitterVisitorContext } from './output/abstract_emitter';
export { JitEvaluator } from './output/output_jit';
export * from './parse_util';
export * from './schema/dom_element_schema_registry';
export * from './selector';
export { Version } from './util';
export * from './injectable_compiler_2';
export * from './render3/partial/api';
export * from './render3/view/api';
export { BoundAttribute as TmplAstBoundAttribute, BoundEvent as TmplAstBoundEvent, BoundText as TmplAstBoundText, Content as TmplAstContent, Element as TmplAstElement, Icu as TmplAstIcu, RecursiveVisitor as TmplAstRecursiveVisitor, Reference as TmplAstReference, Template as TmplAstTemplate, Text as TmplAstText, TextAttribute as TmplAstTextAttribute, Variable as TmplAstVariable } from './render3/r3_ast';
export * from './render3/view/t2_api';
export * from './render3/view/t2_binder';
export { Identifiers as R3Identifiers } from './render3/r3_identifiers';
export { compileClassMetadata } from './render3/r3_class_metadata_compiler';
export { compileFactoryFunction, FactoryTarget } from './render3/r3_factory';
export { compileNgModule } from './render3/r3_module_compiler';
export { compileInjector } from './render3/r3_injector_compiler';
export { compilePipeFromMetadata } from './render3/r3_pipe_compiler';
export { makeBindingParser, parseTemplate } from './render3/view/template';
export { createMayBeForwardRefExpression, devOnlyGuardedExpression, getSafePropertyAccessString } from './render3/util';
export { compileComponentFromMetadata, compileDirectiveFromMetadata, parseHostBindings, verifyHostBindings } from './render3/view/compiler';
export { compileDeclareClassMetadata } from './render3/partial/class_metadata';
export { compileDeclareComponentFromMetadata } from './render3/partial/component';
export { compileDeclareDirectiveFromMetadata } from './render3/partial/directive';
export { compileDeclareFactoryFunction } from './render3/partial/factory';
export { compileDeclareInjectableFromMetadata } from './render3/partial/injectable';
export { compileDeclareInjectorFromMetadata } from './render3/partial/injector';
export { compileDeclareNgModuleFromMetadata } from './render3/partial/ng_module';
export { compileDeclarePipeFromMetadata } from './render3/partial/pipe';
export { publishFacade } from './jit_compiler_facade';
export { emitDistinctChangesOnlyDefaultValue, ChangeDetectionStrategy, ViewEncapsulation } from './core';
export * as outputAst from './output/output_ast';
// This file only reexports content of the `src` folder. Keep it that way.
// This function call has a global side effects and publishes the compiler into global namespace for
// the late binding of the Compiler to the @angular/core for jit compilation.
publishFacade(global);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0QyxzQ0FBc0M7QUFDdEMsc0NBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsT0FBTyxLQUFLLElBQUksTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGdCQUFnQixFQUFpQixNQUFNLFFBQVEsQ0FBQztBQUNoRixPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7QUFFZCxjQUFjLFdBQVcsQ0FBQztBQUMxQixPQUFPLEVBQUMsY0FBYyxFQUFFLDBCQUEwQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3BFLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyx5QkFBeUIsQ0FBQztBQUN4QyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsNEJBQTRCLENBQUM7QUFDM0MsY0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLHlCQUF5QixDQUFDO0FBQ3hDLGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyxrQ0FBa0MsQ0FBQztBQUNqRCxjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLE1BQU0s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QUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1DQUFtQyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZHLE9BQU8sS0FBSyxTQUFTLE1BQU0scUJBQXFCLENBQUM7QUFDakQsMEVBQTBFO0FBRTFFLG9HQUFvRztBQUNwRyw2RUFBNkU7QUFDN0UsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBUSElTIEZJTEUgSEFTIEdMT0JBTCBTSURFIEVGRkVDVCAvL1xuLy8gICAgICAgKHNlZSBib3R0b20gb2YgZmlsZSkgICAgICAgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIEFQSXMgb2YgdGhlIGNvbXBpbGVyIHBhY2thZ2UuXG4gKlxuICogPGRpdiBjbGFzcz1cImNhbGxvdXQgaXMtY3JpdGljYWxcIj5cbiAqICAgPGhlYWRlcj5VbnN0YWJsZSBBUElzPC9oZWFkZXI+XG4gKiAgIDxwPlxuICogICAgIEFsbCBjb21waWxlciBhcGlzIGFyZSBjdXJyZW50bHkgY29uc2lkZXJlZCBleHBlcmltZW50YWwgYW5kIHByaXZhdGUhXG4gKiAgIDwvcD5cbiAqICAgPHA+XG4gKiAgICAgV2UgZXhwZWN0IHRoZSBBUElzIGluIHRoaXMgcGFja2FnZSB0byBrZWVwIG9uIGNoYW5naW5nLiBEbyBub3QgcmVseSBvbiB0aGVtLlxuICogICA8L3A+XG4gKiA8L2Rpdj5cbiAqL1xuXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vY29yZSc7XG5pbXBvcnQge3B1Ymxpc2hGYWNhZGV9IGZyb20gJy4vaml0X2NvbXBpbGVyX2ZhY2FkZSc7XG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BLCBTY2hlbWFNZXRhZGF0YX0gZnJvbSAnLi9jb3JlJztcbmV4cG9ydCB7Y29yZX07XG5cbmV4cG9ydCAqIGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQge0NvbXBpbGVyQ29uZmlnLCBwcmVzZXJ2ZVdoaXRlc3BhY2VzRGVmYXVsdH0gZnJvbSAnLi9jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXNvdXJjZV9sb2FkZXInO1xuZXhwb3J0IHtDb25zdGFudFBvb2x9IGZyb20gJy4vY29uc3RhbnRfcG9vbCc7XG5leHBvcnQge0RFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcsIEludGVycG9sYXRpb25Db25maWd9IGZyb20gJy4vbWxfcGFyc2VyL2ludGVycG9sYXRpb25fY29uZmlnJztcbmV4cG9ydCAqIGZyb20gJy4vc2NoZW1hL2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmV4cG9ydCAqIGZyb20gJy4vaTE4bi9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL2FzdCc7XG5leHBvcnQgKiBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL2xleGVyJztcbmV4cG9ydCAqIGZyb20gJy4vZXhwcmVzc2lvbl9wYXJzZXIvcGFyc2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbWxfcGFyc2VyL2FzdCc7XG5leHBvcnQgKiBmcm9tICcuL21sX3BhcnNlci9odG1sX3BhcnNlcic7XG5leHBvcnQgKiBmcm9tICcuL21sX3BhcnNlci9odG1sX3RhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9tbF9wYXJzZXIvdGFncyc7XG5leHBvcnQge1BhcnNlVHJlZVJlc3VsdCwgVHJlZUVycm9yfSBmcm9tICcuL21sX3BhcnNlci9wYXJzZXInO1xuZXhwb3J0IHtMZXhlclJhbmdlfSBmcm9tICcuL21sX3BhcnNlci9sZXhlcic7XG5leHBvcnQgKiBmcm9tICcuL21sX3BhcnNlci94bWxfcGFyc2VyJztcbmV4cG9ydCB7QXJyYXlUeXBlLCBEWU5BTUlDX1RZUEUsIEJpbmFyeU9wZXJhdG9yLCBCaW5hcnlPcGVyYXRvckV4cHIsIEJ1aWx0aW5UeXBlLCBCdWlsdGluVHlwZU5hbWUsIENvbW1hRXhwciwgQ29uZGl0aW9uYWxFeHByLCBEZWNsYXJlRnVuY3Rpb25TdG10LCBEZWNsYXJlVmFyU3RtdCwgRXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgRXhwcmVzc2lvblR5cGUsIEV4cHJlc3Npb25WaXNpdG9yLCBFeHRlcm5hbEV4cHIsIEV4dGVybmFsUmVmZXJlbmNlLCBsaXRlcmFsTWFwLCBGdW5jdGlvbkV4cHIsIElmU3RtdCwgSW5zdGFudGlhdGVFeHByLCBJbnZva2VGdW5jdGlvbkV4cHIsIExpdGVyYWxBcnJheUV4cHIsIExpdGVyYWxFeHByLCBMaXRlcmFsTWFwRXhwciwgTWFwVHlwZSwgTm90RXhwciwgTk9ORV9UWVBFLCBSZWFkS2V5RXhwciwgUmVhZFByb3BFeHByLCBSZWFkVmFyRXhwciwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnRWaXNpdG9yLCBUYWdnZWRUZW1wbGF0ZUV4cHIsIFRlbXBsYXRlTGl0ZXJhbCwgVGVtcGxhdGVMaXRlcmFsRWxlbWVudCwgVHlwZSwgVHlwZU1vZGlmaWVyLCBUeXBlVmlzaXRvciwgV3JhcHBlZE5vZGVFeHByLCBXcml0ZUtleUV4cHIsIFdyaXRlUHJvcEV4cHIsIFdyaXRlVmFyRXhwciwgU3RtdE1vZGlmaWVyLCBTdGF0ZW1lbnQsIFNUUklOR19UWVBFLCBUeXBlb2ZFeHByLCBqc0RvY0NvbW1lbnQsIGxlYWRpbmdDb21tZW50LCBMZWFkaW5nQ29tbWVudCwgSlNEb2NDb21tZW50LCBVbmFyeU9wZXJhdG9yLCBVbmFyeU9wZXJhdG9yRXhwciwgTG9jYWxpemVkU3RyaW5nfSBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmV4cG9ydCB7RW1pdHRlclZpc2l0b3JDb250ZXh0fSBmcm9tICcuL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyJztcbmV4cG9ydCB7Sml0RXZhbHVhdG9yfSBmcm9tICcuL291dHB1dC9vdXRwdXRfaml0JztcbmV4cG9ydCAqIGZyb20gJy4vcGFyc2VfdXRpbCc7XG5leHBvcnQgKiBmcm9tICcuL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuZXhwb3J0ICogZnJvbSAnLi9zZWxlY3Rvcic7XG5leHBvcnQge1ZlcnNpb259IGZyb20gJy4vdXRpbCc7XG5leHBvcnQge1NvdXJjZU1hcH0gZnJvbSAnLi9vdXRwdXQvc291cmNlX21hcCc7XG5leHBvcnQgKiBmcm9tICcuL2luamVjdGFibGVfY29tcGlsZXJfMic7XG5leHBvcnQgKiBmcm9tICcuL3JlbmRlcjMvcGFydGlhbC9hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9yZW5kZXIzL3ZpZXcvYXBpJztcbmV4cG9ydCB7Qm91bmRBdHRyaWJ1dGUgYXMgVG1wbEFzdEJvdW5kQXR0cmlidXRlLCBCb3VuZEV2ZW50IGFzIFRtcGxBc3RCb3VuZEV2ZW50LCBCb3VuZFRleHQgYXMgVG1wbEFzdEJvdW5kVGV4dCwgQ29udGVudCBhcyBUbXBsQXN0Q29udGVudCwgRWxlbWVudCBhcyBUbXBsQXN0RWxlbWVudCwgSWN1IGFzIFRtcGxBc3RJY3UsIE5vZGUgYXMgVG1wbEFzdE5vZGUsIFJlY3Vyc2l2ZVZpc2l0b3IgYXMgVG1wbEFzdFJlY3Vyc2l2ZVZpc2l0b3IsIFJlZmVyZW5jZSBhcyBUbXBsQXN0UmVmZXJlbmNlLCBUZW1wbGF0ZSBhcyBUbXBsQXN0VGVtcGxhdGUsIFRleHQgYXMgVG1wbEFzdFRleHQsIFRleHRBdHRyaWJ1dGUgYXMgVG1wbEFzdFRleHRBdHRyaWJ1dGUsIFZhcmlhYmxlIGFzIFRtcGxBc3RWYXJpYWJsZX0gZnJvbSAnLi9yZW5kZXIzL3IzX2FzdCc7XG5leHBvcnQgKiBmcm9tICcuL3JlbmRlcjMvdmlldy90Ml9hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9yZW5kZXIzL3ZpZXcvdDJfYmluZGVyJztcbmV4cG9ydCB7SWRlbnRpZmllcnMgYXMgUjNJZGVudGlmaWVyc30gZnJvbSAnLi9yZW5kZXIzL3IzX2lkZW50aWZpZXJzJztcbmV4cG9ydCB7UjNDbGFzc01ldGFkYXRhLCBDb21waWxlQ2xhc3NNZXRhZGF0YUZuLCBjb21waWxlQ2xhc3NNZXRhZGF0YX0gZnJvbSAnLi9yZW5kZXIzL3IzX2NsYXNzX21ldGFkYXRhX2NvbXBpbGVyJztcbmV4cG9ydCB7Y29tcGlsZUZhY3RvcnlGdW5jdGlvbiwgUjNEZXBlbmRlbmN5TWV0YWRhdGEsIFIzRmFjdG9yeU1ldGFkYXRhLCBGYWN0b3J5VGFyZ2V0fSBmcm9tICcuL3JlbmRlcjMvcjNfZmFjdG9yeSc7XG5leHBvcnQge2NvbXBpbGVOZ01vZHVsZSwgUjNOZ01vZHVsZU1ldGFkYXRhfSBmcm9tICcuL3JlbmRlcjMvcjNfbW9kdWxlX2NvbXBpbGVyJztcbmV4cG9ydCB7Y29tcGlsZUluamVjdG9yLCBSM0luamVjdG9yTWV0YWRhdGF9IGZyb20gJy4vcmVuZGVyMy9yM19pbmplY3Rvcl9jb21waWxlcic7XG5leHBvcnQge2NvbXBpbGVQaXBlRnJvbU1ldGFkYXRhLCBSM1BpcGVNZXRhZGF0YX0gZnJvbSAnLi9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXInO1xuZXhwb3J0IHttYWtlQmluZGluZ1BhcnNlciwgUGFyc2VkVGVtcGxhdGUsIHBhcnNlVGVtcGxhdGUsIFBhcnNlVGVtcGxhdGVPcHRpb25zfSBmcm9tICcuL3JlbmRlcjMvdmlldy90ZW1wbGF0ZSc7XG5leHBvcnQge0ZvcndhcmRSZWZIYW5kbGluZywgTWF5YmVGb3J3YXJkUmVmRXhwcmVzc2lvbiwgUjNDb21waWxlZEV4cHJlc3Npb24sIFIzUmVmZXJlbmNlLCBjcmVhdGVNYXlCZUZvcndhcmRSZWZFeHByZXNzaW9uLCBkZXZPbmx5R3VhcmRlZEV4cHJlc3Npb24sIGdldFNhZmVQcm9wZXJ0eUFjY2Vzc1N0cmluZ30gZnJvbSAnLi9yZW5kZXIzL3V0aWwnO1xuZXhwb3J0IHtjb21waWxlQ29tcG9uZW50RnJvbU1ldGFkYXRhLCBjb21waWxlRGlyZWN0aXZlRnJvbU1ldGFkYXRhLCBwYXJzZUhvc3RCaW5kaW5ncywgUGFyc2VkSG9zdEJpbmRpbmdzLCB2ZXJpZnlIb3N0QmluZGluZ3N9IGZyb20gJy4vcmVuZGVyMy92aWV3L2NvbXBpbGVyJztcbmV4cG9ydCB7Y29tcGlsZURlY2xhcmVDbGFzc01ldGFkYXRhfSBmcm9tICcuL3JlbmRlcjMvcGFydGlhbC9jbGFzc19tZXRhZGF0YSc7XG5leHBvcnQge2NvbXBpbGVEZWNsYXJlQ29tcG9uZW50RnJvbU1ldGFkYXRhLCBEZWNsYXJlQ29tcG9uZW50VGVtcGxhdGVJbmZvfSBmcm9tICcuL3JlbmRlcjMvcGFydGlhbC9jb21wb25lbnQnO1xuZXhwb3J0IHtjb21waWxlRGVjbGFyZURpcmVjdGl2ZUZyb21NZXRhZGF0YX0gZnJvbSAnLi9yZW5kZXIzL3BhcnRpYWwvZGlyZWN0aXZlJztcbmV4cG9ydCB7Y29tcGlsZURlY2xhcmVGYWN0b3J5RnVuY3Rpb259IGZyb20gJy4vcmVuZGVyMy9wYXJ0aWFsL2ZhY3RvcnknO1xuZXhwb3J0IHtjb21waWxlRGVjbGFyZUluamVjdGFibGVGcm9tTWV0YWRhdGF9IGZyb20gJy4vcmVuZGVyMy9wYXJ0aWFsL2luamVjdGFibGUnO1xuZXhwb3J0IHtjb21waWxlRGVjbGFyZUluamVjdG9yRnJvbU1ldGFkYXRhfSBmcm9tICcuL3JlbmRlcjMvcGFydGlhbC9pbmplY3Rvcic7XG5leHBvcnQge2NvbXBpbGVEZWNsYXJlTmdNb2R1bGVGcm9tTWV0YWRhdGF9IGZyb20gJy4vcmVuZGVyMy9wYXJ0aWFsL25nX21vZHVsZSc7XG5leHBvcnQge2NvbXBpbGVEZWNsYXJlUGlwZUZyb21NZXRhZGF0YX0gZnJvbSAnLi9yZW5kZXIzL3BhcnRpYWwvcGlwZSc7XG5leHBvcnQge3B1Ymxpc2hGYWNhZGV9IGZyb20gJy4vaml0X2NvbXBpbGVyX2ZhY2FkZSc7XG5leHBvcnQge2VtaXREaXN0aW5jdENoYW5nZXNPbmx5RGVmYXVsdFZhbHVlLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4vY29yZSc7XG5leHBvcnQgKiBhcyBvdXRwdXRBc3QgZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG4vLyBUaGlzIGZpbGUgb25seSByZWV4cG9ydHMgY29udGVudCBvZiB0aGUgYHNyY2AgZm9sZGVyLiBLZWVwIGl0IHRoYXQgd2F5LlxuXG4vLyBUaGlzIGZ1bmN0aW9uIGNhbGwgaGFzIGEgZ2xvYmFsIHNpZGUgZWZmZWN0cyBhbmQgcHVibGlzaGVzIHRoZSBjb21waWxlciBpbnRvIGdsb2JhbCBuYW1lc3BhY2UgZm9yXG4vLyB0aGUgbGF0ZSBiaW5kaW5nIG9mIHRoZSBDb21waWxlciB0byB0aGUgQGFuZ3VsYXIvY29yZSBmb3Igaml0IGNvbXBpbGF0aW9uLlxucHVibGlzaEZhY2FkZShnbG9iYWwpO1xuIl19