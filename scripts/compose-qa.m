#import <AppKit/AppKit.h>

int main(void) {
    @autoreleasepool {
        NSString *project = @"/Users/admin/Documents/Codex-projects/mingyu-miniapp-prototype";
        NSImage *systemReference = [[NSImage alloc] initWithContentsOfFile:@"/private/tmp/mingyu-system-reference.png"];
        NSImage *systemImplementation = [[NSImage alloc] initWithContentsOfFile:@"/private/tmp/mingyu-services-system-final.png"];
        NSImage *softwareReference = [[NSImage alloc] initWithContentsOfFile:@"/private/tmp/mingyu-software-reference.png"];
        NSImage *softwareImplementation = [[NSImage alloc] initWithContentsOfFile:@"/private/tmp/mingyu-services-software-aligned.png"];
        if (!systemReference || !systemImplementation || !softwareReference || !softwareImplementation) return 1;

        NSSize size = NSMakeSize(882, 1840);
        NSImage *result = [[NSImage alloc] initWithSize:size];
        [result lockFocus];
        [[NSColor colorWithCalibratedRed:0.93 green:0.95 blue:0.97 alpha:1] setFill];
        NSRectFill(NSMakeRect(0, 0, size.width, size.height));

        NSDictionary *attrs = @{
            NSFontAttributeName: [NSFont systemFontOfSize:18 weight:NSFontWeightSemibold],
            NSForegroundColorAttributeName: [NSColor colorWithCalibratedWhite:0.08 alpha:1]
        };
        [@"系统开发参考 · 子项目" drawAtPoint:NSMakePoint(24, 1800) withAttributes:attrs];
        [@"系统开发原型 · 393×852" drawAtPoint:NSMakePoint(465, 1800) withAttributes:attrs];
        [systemReference drawInRect:NSMakeRect(24, 1040, 393, 655)];
        [systemImplementation drawInRect:NSMakeRect(465, 944, 393, 852)];

        [@"软件开发参考 · 子项目" drawAtPoint:NSMakePoint(24, 880) withAttributes:attrs];
        [@"软件开发原型 · 393×852" drawAtPoint:NSMakePoint(465, 880) withAttributes:attrs];
        [softwareReference drawInRect:NSMakeRect(24, 120, 393, 655)];
        [softwareImplementation drawInRect:NSMakeRect(465, 24, 393, 852)];
        [result unlockFocus];

        NSBitmapImageRep *bitmap = [[NSBitmapImageRep alloc] initWithData:[result TIFFRepresentation]];
        NSData *png = [bitmap representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
        return [png writeToFile:[project stringByAppendingPathComponent:@"qa-service-comparison-final.png"] atomically:YES] ? 0 : 1;
    }
}
