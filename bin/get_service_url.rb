#!/usr/bin/env ruby

require 'logger'

module Logging
  def logger
    Logging.logger
  end

  def self.logger
    @logger ||= Logger.new(STDOUT)
  end
end

module VCAPService
	attr_accessor :data

	class Read
		class << self
			include Logging
			
			def findServiceCredentials(environment)
				#logger.info "finding service credentials"				
				#logger.debug @data

				@data = ENV[environment] || '{}'
				url, name = @data.scan(/"(url|name)": "([^ ,\}]+)"/)
				
				#logger.debug url[1]
				#logger.debug name[1]
				if(name!=nil && url!=nil)
					puts 'export ' + name[1]+'="' + url[1] + '"'
				end
				
			end
    	end
	end
end

VCAPService::Read.findServiceCredentials('VCAP_SERVICES')
